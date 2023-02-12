import type World from "./World";

import * as THREE from "three";
import GPUComputation from "./GPUComputation";
import vertexShader from "../shaders/particles/vertexShader.glsl";
import fragmentShader from "../shaders/particles/fragmentShader.glsl";
import {config} from "../../config";
import {DataTexture} from "three";

export default class ParticleSystem {
    particles: THREE.Points<THREE.BufferGeometry, THREE.Material>;
    protected geometry: THREE.BufferGeometry;
    protected material: THREE.ShaderMaterial;
    protected world: World;
    protected gpuComputation: GPUComputation;
    private faceFlattener: Worker;
    private isProcessingFace: boolean;

    constructor(world: World, visible: boolean = true) {
        this.world = world;
        this.faceFlattener = new Worker(new URL('../workers/face-flattener.js', import.meta.url), {
            type: 'module'
        });
        this.faceFlattener.onmessage = (event) => {
            let faceTextureData = event.data[0];
            this.gpuComputation.updateFaceTextures(faceTextureData[0], faceTextureData[1]);
            this.isProcessingFace = false;
            this.world.loop.isFaceDetected = true;
        }
        this.addGPUComputation();
        this.addGeometry();
        this.addMaterial();
        this.particles = new THREE.Points(this.geometry, this.material);
        this.world.scene.add(this.particles);
        visible ? this.show() : this.hide();
    }

    protected addGeometry() {
        this.geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array(this.gpuComputation.texturePoints  * 3).fill(0);
        const references = new Float32Array(this.gpuComputation.texturePoints * 2);
        for (let i = 0; i < references.length; i += 2) {
            const indexVertex = i / 2;
            references[i] = (indexVertex % this.gpuComputation.textureWidth) / this.gpuComputation.textureWidth;
            references[i + 1] = Math.floor(indexVertex / this.gpuComputation.textureWidth) / this.gpuComputation.textureHeight;
        }
        this.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        this.geometry.setAttribute('reference', new THREE.BufferAttribute(references, 2));
        //this.geometry.morphAttributes.position = [];
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
                u_particlesPosition: { value: new DataTexture() },
                u_particlesVelocity: { value: new DataTexture() }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthTest: false,
            depthWrite: false
        });
        //this.material.morphTargets = true;
    }

    protected addGPUComputation() {
        this.gpuComputation = new GPUComputation({
            texture_width: config.threeJS.scene.textureSize,
            texture_height: config.threeJS.scene.textureSize * 2,
            renderer: this.world.renderer
        });
    }

    show() {
        this.particles.visible = true;
    }

    hide() {
        this.particles.visible = false;
    }

    resize() {
        this.material.uniforms.u_resolution.value.x = this.world.currentSizes.width;
        this.material.uniforms.u_resolution.value.y = this.world.currentSizes.height;
    }

    detectFaces() {
        this.world.faceMeshDetector.detectFaces().then((estimatedFaces) => {
            if (estimatedFaces.length != 0) {
                let estimatedFace = estimatedFaces[0];
                if (this.isFaceToUpdate()) {
                    this.isProcessingFace = true;
                    this.faceFlattener.postMessage([
                        estimatedFace,
                        this.gpuComputation.textureArraySize,
                        this.world.currentSizes,
                        config.threeJS.scene.triangulateFace
                    ]);
                    this.world.faceExpressionDetector.detectExpressions().then((estimatedExpression) => {
                        let estimation = estimatedExpression[0];
                        if (estimation) this.world.musicGenerator.setSentiment(estimation.expressions);
                    });
                    this.world.musicGenerator.updateFromFaceEstimation(estimatedFace);
                }
            } else {
                this.world.loop.isFaceDetected = false;
            }
        });
    }

    updateMorphTarget(positions: ArrayLike<number>) {
        // this.geometry.morphAttributes.position.push(targetPosition);
        // this.particles.updateMorphTargets();
        let velocities = new Float32Array(this.gpuComputation.textureArraySize).fill(0);
        this.gpuComputation.updateMorphTextures(positions, velocities);
    }

    updateUniforms(elapsedTime: number, delta: number) {
        this.gpuComputation.compute(elapsedTime, delta, this.world.loop.isFaceDetected,
            this.world.loop.isMorphEnabled);
        this.material.uniforms.u_delta.value = delta;
        this.material.uniforms.u_time.value = elapsedTime;
        this.material.uniforms.u_distortion.value = this.world.settings.distortion;
        this.material.uniforms.u_particlesPosition.value = this.gpuComputation.getCurrentParticlesPosition();
        this.material.uniforms.u_particlesVelocity.value = this.gpuComputation.getCurrentParticlesVelocity();
    }

    private isFaceToUpdate(): boolean {
        return !this.world.loop.isFaceDetected && !this.isProcessingFace;
    }

}