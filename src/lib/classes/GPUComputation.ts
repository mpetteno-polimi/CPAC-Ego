import type {DataTexture} from "three";
import type {Variable} from "three/examples/jsm/misc/GPUComputationRenderer.js";

import * as THREE from "three";
import {GPUComputationRenderer} from "three/examples/jsm/misc/GPUComputationRenderer";
import fragmentPositionShader from "../shaders/gpu-computation/fragmentPositionShader.glsl";
import fragmentVelocityShader from "../shaders/gpu-computation/fragmentVelocityShader.glsl";
import fragmentFacePositionShader from "../shaders/gpu-computation/fragmentFacePositionShader.glsl";
import fragmentFaceVelocityShader from "../shaders/gpu-computation/fragmentFaceVelocityShader.glsl";

export default class GPUComputation {

    textureWidth: number;
    textureHeight: number;
    texturePoints: number;
    textureArraySize: number;
    private gpuComputationRenderer: GPUComputationRenderer;

    /* ########################## SPHERE ############################# */
    private positionData: DataTexture;
    private velocityData: DataTexture;
    private positionVariable: Variable;
    private velocityVariable: Variable;

    /* ########################## FACE ############################# */
    private positionFaceData: DataTexture;
    private velocityFaceData: DataTexture;
    private positionFaceVariable: Variable;
    private velocityFaceVariable: Variable;

    constructor(props) {
        this.textureWidth = props.texture_width;
        this.textureHeight = props.texture_height;
        this.texturePoints = this.textureWidth * this.textureHeight;
        this.textureArraySize = this.texturePoints * 4;
        this.gpuComputationRenderer = new GPUComputationRenderer(this.textureWidth, this.textureHeight, props.renderer);
        if (props.renderer.capabilities.isWebGL2 === false ) {
            this.gpuComputationRenderer.setDataType(THREE.HalfFloatType);
        }
        this.initSphereTexturesData();
        this.initVariables();
        const gpuComputationRendererError = this.gpuComputationRenderer.init();
        if (gpuComputationRendererError) {
            console.error('ERROR', gpuComputationRendererError);
        }
    }

    compute(delta, isFaceDetected) {
        let u_delta = Math.min(delta, 0.5);
        // Positions
        this.positionVariable.material.uniforms.u_delta.value = u_delta;
        this.positionVariable.material.uniforms.u_faceDetected.value = false;
        this.positionVariable.material.uniforms.u_dlaEnabled.value = true;
        this.velocityVariable.material.uniforms.u_delta.value = u_delta;
        this.velocityVariable.material.uniforms.u_faceDetected.value = false;
        this.velocityVariable.material.uniforms.u_dlaEnabled.value = true;
        // Face
        this.positionFaceVariable.material.uniforms.u_delta.value = u_delta;
        this.velocityFaceVariable.material.uniforms.u_delta.value = u_delta;
        this.gpuComputationRenderer.compute();
    }

    getCurrentTexturePosition() {
        return this.gpuComputationRenderer.getCurrentRenderTarget(this.positionVariable).texture;
    }

    getCurrentTextureVelocity() {
        return this.gpuComputationRenderer.getCurrentRenderTarget(this.velocityVariable).texture;
    }

    updateFaceTextures(positions: ArrayLike<number>, velocities: ArrayLike<number>) {
        this.initFaceTexturesData(positions, velocities);
        this.gpuComputationRenderer.renderTexture(this.positionFaceData, this.positionFaceVariable.renderTargets[0]);
        this.gpuComputationRenderer.renderTexture(this.positionFaceData, this.positionFaceVariable.renderTargets[1]);
        this.gpuComputationRenderer.renderTexture(this.velocityFaceData, this.velocityFaceVariable.renderTargets[0]);
        this.gpuComputationRenderer.renderTexture(this.velocityFaceData, this.velocityFaceVariable.renderTargets[1]);
    }

    private initSphereTexturesData() {
        let sphereTextureData = this.getSphereTextureData();
        this.positionData = this.gpuComputationRenderer.createTexture();
        this.velocityData = this.gpuComputationRenderer.createTexture();
        this.positionData.image.data.set(sphereTextureData[0]);
        this.velocityData.image.data.set(sphereTextureData[1]);
    }

    private initFaceTexturesData(positions: ArrayLike<number>, velocities: ArrayLike<number>) {
        this.positionFaceData = this.gpuComputationRenderer.createTexture();
        this.velocityFaceData = this.gpuComputationRenderer.createTexture();
        this.positionFaceData.image.data.set(positions);
        this.velocityFaceData.image.data.set(velocities);
    }

    private initVariables() {
        // Sphere - Position
        this.positionVariable = this.gpuComputationRenderer.addVariable('texturePosition',
            fragmentPositionShader, this.positionData);
        this.positionVariable.material.uniforms.u_delta = { value: 0 };
        this.positionVariable.material.uniforms.u_faceDetected = { value: false };
        this.positionVariable.wrapS = THREE.RepeatWrapping;
        this.positionVariable.wrapT = THREE.RepeatWrapping;
        // Sphere - Velocity
        this.velocityVariable = this.gpuComputationRenderer.addVariable('textureVelocity',
            fragmentVelocityShader, this.velocityData);
        this.velocityVariable.material.uniforms.u_delta = { value: 0 };
        this.velocityVariable.material.uniforms.u_faceDetected = { value: false };
        this.velocityVariable.wrapS = THREE.RepeatWrapping;
        this.velocityVariable.wrapT = THREE.RepeatWrapping;
        // Face - Position
        this.positionFaceVariable = this.gpuComputationRenderer.addVariable('textureFacePosition',
            fragmentFacePositionShader, this.positionFaceData);
        this.positionFaceVariable.material.uniforms.u_delta = { value: 0 };
        this.positionFaceVariable.wrapS = THREE.RepeatWrapping;
        this.positionFaceVariable.wrapT = THREE.RepeatWrapping;
        // Face - Velocity
        this.velocityFaceVariable = this.gpuComputationRenderer.addVariable('textureFaceVelocity',
            fragmentFaceVelocityShader, this.velocityFaceData);
        this.velocityFaceVariable.material.uniforms.u_delta = { value: 0 };
        this.velocityFaceVariable.wrapS = THREE.RepeatWrapping;
        this.velocityFaceVariable.wrapT = THREE.RepeatWrapping;
        // Dependencies
        this.gpuComputationRenderer.setVariableDependencies(this.positionVariable,
            [this.velocityVariable, this.positionVariable, this.positionFaceVariable]);
        this.gpuComputationRenderer.setVariableDependencies(this.velocityVariable,
            [this.velocityVariable, this.positionVariable]);
        this.gpuComputationRenderer.setVariableDependencies(this.positionFaceVariable,
            [this.velocityFaceVariable, this.positionFaceVariable]);
        this.gpuComputationRenderer.setVariableDependencies(this.velocityFaceVariable,
            [this.velocityFaceVariable, this.positionFaceVariable]);
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
