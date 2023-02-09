import type {Variable} from "three/examples/jsm/misc/GPUComputationRenderer.js";

import {GPUComputationRenderer} from "three/examples/jsm/misc/GPUComputationRenderer";
import * as THREE from "three";
import {BufferGeometry, DataTexture, Points, ShaderMaterial, Vector2, Vector3} from "three";
import fragmentDLAPositionShader from "../shaders/gpu-computation/fragmentDLAPositionShader.glsl";
import vertexShader from "../shaders/particles/vertexShader.glsl";
import fragmentShader from "../shaders/particles/fragmentShader.glsl";
import type World from "./World";


/* ########################## DIFFUSION-LIMITED AGGREGATION (DLA) ############################# */
export default class DLA {

    textureWidth: number;
    textureHeight: number;
    texturePoints: number;
    textureArraySize: number;
    private gpuComputationRenderer: GPUComputationRenderer;
    private positionDLAData: DataTexture;
    private positionDLAVariable: Variable;
    private boundingSphereCenter: Vector3;
    private boundingSphereRadius: number;
    private bufferGeometry: BufferGeometry;
    private material: ShaderMaterial;
    private world: World;
    private readonly particles: Points<BufferGeometry, ShaderMaterial>;


    // PARAMETERS
    private STEPLEN = 0.01;
    private PADDING = this.STEPLEN*2;
    private POINTS_PER_SPHERE = 4000;
    private MAX_DIST = 0.01;
    private AGGREGATION_PROBABILITY = 1;


    constructor(world: World, props) {
        this.world = world;
        this.textureWidth = props.texture_width;
        this.textureHeight = props.texture_height;
        this.texturePoints = this.textureWidth * this.textureHeight;
        this.textureArraySize = this.texturePoints * 4;
        this.gpuComputationRenderer = new GPUComputationRenderer(this.textureWidth, this.textureHeight, this.world.renderer);
        if (world.renderer.capabilities.isWebGL2 === false) {
            this.gpuComputationRenderer.setDataType(THREE.HalfFloatType);
        }
        this.addGeometry();
        this.addMaterial();
        this.particles = new THREE.Points(this.bufferGeometry, this.material);
        this.world.scene.add(this.particles);
        this.initDLATextureData();
        this.initVariables();
        const gpuComputationRendererError = this.gpuComputationRenderer.init();
        if (gpuComputationRendererError) {
            console.error('ERROR', gpuComputationRendererError);
        }
    }

    protected addGeometry() {
        this.bufferGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array(this.texturePoints  * 3).fill(0);
        const references = new Float32Array(this.texturePoints * 2);
        for (let i = 0; i < references.length; i += 2) {
            const indexVertex = i / 2;
            references[i] = (indexVertex % this.textureWidth) / this.textureWidth;
            references[i + 1] = Math.floor(indexVertex / this.textureWidth) / this.textureHeight;
        }
        this.bufferGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        this.bufferGeometry.setAttribute('reference', new THREE.BufferAttribute(references, 2));
    }

    protected addMaterial() {
        this.material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: "#extension GL_OES_standard_derivatives : enable"
            },
            side: THREE.DoubleSide,
            uniforms: {
                u_delta: { value: 0 },
                u_time: { value: 0 },
                u_distortion: { value: 0 },
                u_resolution: { value: new THREE.Vector2() },
                u_uvRate: { value: new THREE.Vector2(1, 1) },
                u_texturePosition: { value: null },
                u_textureVelocity: { value: null }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthTest: false,
            depthWrite: false
        });
    }

    private initDLATextureData() {
        this.boundingSphereRadius = 0;
        this.boundingSphereCenter = new Vector3(0, 0, 0);
        let emptyTextureData = this.getEmptyTextureData();
        this.positionDLAData = this.gpuComputationRenderer.createTexture();
        this.positionDLAData.image.data.set(emptyTextureData[0]);
    }

    update(delta) {
        this.positionDLAVariable.material.uniforms.u_delta.value = Math.min(delta, 0.5);
        this.positionDLAVariable.material.uniforms.u_boundingSphereRadius.value = this.boundingSphereRadius;
        this.positionDLAVariable.material.uniforms.u_boundingSphereCenter.value = this.boundingSphereCenter;
        this.gpuComputationRenderer.compute();
        let renderTarget = this.gpuComputationRenderer.getCurrentRenderTarget(this.positionDLAVariable);
        this.material.uniforms.u_texturePosition.value = renderTarget.texture;
        this.material.uniforms.u_delta.value = delta;
        // Read GPU current texture and update it with new moving points
        let buffer = new Float32Array(renderTarget.width * renderTarget.height * 4);
        this.world.renderer.readRenderTargetPixels(renderTarget, 0, 0, renderTarget.width, renderTarget.height, buffer);
        this.positionDLAData.image.data.set(this.spawnNewMovingPoints(buffer));
        this.gpuComputationRenderer.renderTexture(this.positionDLAData, this.positionDLAVariable.renderTargets[0]);
    }
    private spawnNewMovingPoints(currentPointsData) {
        let movingPointsCounter = 0;
        let unmovedPointsIdx = [];
        let minX = +Infinity, minY = +Infinity, minZ = +Infinity;
        let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
        for (let i = 0; i < this.textureArraySize; i += 4) {
            const x = currentPointsData[i], y = currentPointsData[i + 1], z = currentPointsData[i + 2];
            const isMovingPoint = currentPointsData[i + 3];
            if (isMovingPoint != 1.0) {
                if (x < minX) minX = x;
                if (y < minY) minY = y;
                if (z < minZ) minZ = z;
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
                if (z > maxZ) maxZ = z;
                if (x == 0.0 && y == 0.0 && z == 0.0) {
                    unmovedPointsIdx.push(i, i + 1, i + 2);
                }
            } else {
                movingPointsCounter++;
            }
        }
        let boundingMax = new Vector3(maxX, maxY, maxZ);
        let boundingMin = new Vector3(minX, minY, minZ);
        this.boundingSphereCenter = boundingMin.add(boundingMax).divideScalar(2);
        this.boundingSphereRadius = this.boundingSphereCenter.distanceTo(boundingMax) + this.PADDING;
        let boundingSphereArea = 4 * Math.pow(this.boundingSphereRadius, 2) * Math.PI;
        let targetMovingPoints = Math.round(boundingSphereArea * this.POINTS_PER_SPHERE);
        if (movingPointsCounter < targetMovingPoints) {
            // Spawn new moving points
            let pointsToSpawn = targetMovingPoints - movingPointsCounter;
            for (let i = 0; i < pointsToSpawn; i++) {
                // Compute new point position on the sphere surface
                let newMovingPointPos = this.getRandomMovingPointPos();
                // Update point positions in texture data
                let pointIdx = unmovedPointsIdx.splice(0, 3);
                currentPointsData[pointIdx[0]] = newMovingPointPos.x;
                currentPointsData[pointIdx[1]] = newMovingPointPos.y;
                currentPointsData[pointIdx[2]] = newMovingPointPos.z;
                currentPointsData[pointIdx[2] + 1] = 1;
            }
        }
        return currentPointsData;
    }

    private getRandomMovingPointPos() {
        console.log(this.boundingSphereRadius)
        let u = Math.random(), v = Math.random();
        let theta = 2 * Math.PI * u;
        let phi = Math.acos(2 * v - 1);
        let x = Math.sin(phi) * Math.cos(theta), y = Math.sin(phi) * Math.sin(theta), z = Math.cos(phi);
        return new Vector3(x, y, z).multiplyScalar(this.boundingSphereRadius).add(this.boundingSphereCenter);
    }

    private initVariables() {
        this.positionDLAVariable = this.gpuComputationRenderer.addVariable('textureDLAPosition',
            fragmentDLAPositionShader, this.positionDLAData);
        this.positionDLAVariable.material.uniforms.u_delta = { value: 0 };
        this.positionDLAVariable.material.uniforms.u_stepLength = { value: this.STEPLEN };
        this.positionDLAVariable.material.uniforms.u_maxDistance = { value: this.MAX_DIST };
        this.positionDLAVariable.material.uniforms.u_aggregationProbability = { value: this.AGGREGATION_PROBABILITY };
        this.positionDLAVariable.material.uniforms.u_textureSize = { value: new Vector2(this.textureWidth, this.textureHeight) };
        this.positionDLAVariable.material.uniforms.u_boundingSphereCenter = { value: 0 };
        this.positionDLAVariable.material.uniforms.u_boundingSphereRadius = { value: new Vector3(0, 0, 0) };
        this.positionDLAVariable.wrapS = THREE.RepeatWrapping;
        this.positionDLAVariable.wrapT = THREE.RepeatWrapping;
        // Dependencies
        this.gpuComputationRenderer.setVariableDependencies(this.positionDLAVariable, [this.positionDLAVariable]);
    }

    private getEmptyTextureData() {
        let positionData = [], velocityData = [];
        for (let i = 0; i < this.textureArraySize; i += 4) {
            i == 0 ? positionData.push(1, 1, 1, 0) : positionData.push(0, 0, 0, 0.5);
            velocityData.push(0, 0, 0, 0);
        }
        return [positionData, velocityData];
    }

    private getSphereTextureData() {
        let positionData = [], velocityData = [];
        for (let i = 0; i < this.textureArraySize; i += 4) {
            const radius = (1 - Math.pow(Math.random(), 3));
            const azimuth = Math.random() * Math.PI;
            const inclination = Math.random() * Math.PI * 2;
            positionData.push(
                radius * Math.sin(azimuth) * Math.cos(inclination),
                radius * Math.cos(azimuth),
                radius * Math.sin(azimuth) * Math.sin(inclination),
                1
            );
            velocityData.push(0, 0, 0, 1);
        }
        return [positionData, velocityData];
    }

}