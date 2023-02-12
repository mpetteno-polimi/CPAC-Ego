import type {DataTexture} from "three";
import type {Variable} from "three/examples/jsm/misc/GPUComputationRenderer.js";

import * as THREE from "three";
import {GPUComputationRenderer} from "three/examples/jsm/misc/GPUComputationRenderer";
import fragmentPositionShader from "../shaders/gpu-computation/fragmentPositionShader.glsl";
import fragmentVelocityShader from "../shaders/gpu-computation/fragmentVelocityShader.glsl";
import fragmentFacePositionShader from "../shaders/gpu-computation/fragmentFacePositionShader.glsl";
import fragmentFaceVelocityShader from "../shaders/gpu-computation/fragmentFaceVelocityShader.glsl";
import fragmentMorphPositionShader from "../shaders/gpu-computation/fragmentMorphPositionShader.glsl";
import fragmentMorphVelocityShader from "../shaders/gpu-computation/fragmentMorphVelocityShader.glsl";

export default class GPUComputation {
    textureWidth: number;
    textureHeight: number;
    texturePoints: number;
    textureArraySize: number;
    private gpuComputationRenderer: GPUComputationRenderer;

    /* ########################## PARTICLES ############################# */
    private positionData: DataTexture;
    private velocityData: DataTexture;
    private positionVariable: Variable;
    private velocityVariable: Variable;

    /* ########################## FACE ############################# */
    private positionFaceData: DataTexture;
    private velocityFaceData: DataTexture;
    private positionFaceVariable: Variable;
    private velocityFaceVariable: Variable;

    /* ########################## MORPH ############################# */
    private positionMorphData: DataTexture;
    private velocityMorphData: DataTexture;
    private positionMorphVariable: Variable;
    private velocityMorphVariable: Variable;

    constructor(props) {
        this.textureWidth = props.texture_width;
        this.textureHeight = props.texture_height;
        this.texturePoints = this.textureWidth * this.textureHeight;
        this.textureArraySize = this.texturePoints * 4;
        this.gpuComputationRenderer = new GPUComputationRenderer(this.textureWidth, this.textureHeight, props.renderer);
        if (props.renderer.capabilities.isWebGL2 === false ) {
            this.gpuComputationRenderer.setDataType(THREE.HalfFloatType);
        }
        this.initTexturesData();
        this.initVariables();
        const gpuComputationRendererError = this.gpuComputationRenderer.init();
        if (gpuComputationRendererError) {
            console.error('ERROR', gpuComputationRendererError);
        }
    }

    compute(elapsedTime: number, delta: number, isFaceDetected: boolean, isMorphEnabled: boolean) {
        this.gpuComputationRenderer.compute();
        let deltaValue = Math.min(delta, 0.5);
        // Particles - Position
        this.positionVariable.material.uniforms.u_delta.value = deltaValue;
        this.positionVariable.material.uniforms.u_time.value = elapsedTime;
        this.positionVariable.material.uniforms.u_faceDetected.value = isFaceDetected;
        this.positionVariable.material.uniforms.u_morphEnabled.value = isMorphEnabled;
        // Particles - Velocity
        this.velocityVariable.material.uniforms.u_delta.value = deltaValue;
        this.velocityVariable.material.uniforms.u_time.value = elapsedTime;
        this.velocityVariable.material.uniforms.u_faceDetected.value = isFaceDetected;
        this.velocityVariable.material.uniforms.u_morphEnabled.value = isMorphEnabled;
        // Face - Position
        this.positionFaceVariable.material.uniforms.u_delta.value = deltaValue;
        this.positionFaceVariable.material.uniforms.u_time.value = elapsedTime;
        this.positionFaceVariable.material.uniforms.u_faceDetected.value = isFaceDetected;
        this.positionFaceVariable.material.uniforms.u_morphEnabled.value = isMorphEnabled;
        // Face - Velocity
        this.velocityFaceVariable.material.uniforms.u_delta.value = deltaValue;
        this.velocityFaceVariable.material.uniforms.u_time.value = elapsedTime;
        this.velocityFaceVariable.material.uniforms.u_faceDetected.value = isFaceDetected;
        this.velocityFaceVariable.material.uniforms.u_morphEnabled.value = isMorphEnabled;
        // Morph - Position
        this.positionMorphVariable.material.uniforms.u_delta.value = deltaValue;
        this.positionMorphVariable.material.uniforms.u_time.value = elapsedTime;
        this.positionMorphVariable.material.uniforms.u_faceDetected.value = isFaceDetected;
        this.positionMorphVariable.material.uniforms.u_morphEnabled.value = isMorphEnabled;
        // Morph - Velocity
        this.velocityMorphVariable.material.uniforms.u_delta.value = deltaValue;
        this.velocityMorphVariable.material.uniforms.u_time.value = elapsedTime;
        this.velocityMorphVariable.material.uniforms.u_faceDetected.value = isFaceDetected;
        this.velocityMorphVariable.material.uniforms.u_morphEnabled.value = isMorphEnabled;
    }

    getCurrentParticlesPosition() {
        return this.gpuComputationRenderer.getCurrentRenderTarget(this.positionVariable).texture;
    }

    getCurrentParticlesVelocity() {
        return this.gpuComputationRenderer.getCurrentRenderTarget(this.velocityVariable).texture;
    }

    updateFaceTextures(positions: ArrayLike<number>, velocities: ArrayLike<number>) {
        this.positionFaceData.image.data.set(positions);
        this.positionFaceData.needsUpdate = true;
        this.velocityFaceData.image.data.set(velocities);
        this.velocityFaceData.needsUpdate = true;
        let currentPosRenderTarget = this.gpuComputationRenderer.getCurrentRenderTarget(this.positionFaceVariable);
        this.gpuComputationRenderer.renderTexture(this.positionFaceData, currentPosRenderTarget);
        let currentVelRenderTarget = this.gpuComputationRenderer.getCurrentRenderTarget(this.velocityFaceVariable);
        this.gpuComputationRenderer.renderTexture(this.velocityFaceData, currentVelRenderTarget);
    }

    updateMorphTextures(positions: ArrayLike<number>, velocities: ArrayLike<number>) {
        this.positionMorphData.image.data.set(positions);
        this.positionMorphData.needsUpdate = true;
        this.velocityMorphData.image.data.set(velocities);
        this.velocityMorphData.needsUpdate = true;
        let currentPosRenderTarget = this.gpuComputationRenderer.getCurrentRenderTarget(this.positionMorphVariable);
        this.gpuComputationRenderer.renderTexture(this.positionMorphData, currentPosRenderTarget);
        let currentVelRenderTarget = this.gpuComputationRenderer.getCurrentRenderTarget(this.velocityMorphVariable);
        this.gpuComputationRenderer.renderTexture(this.velocityMorphData, currentVelRenderTarget);
    }

    private initTexturesData() {
        let emptyTextureData = this.getEmptyTextureData();
        let sphereTextureData = this.getSphereTextureData();
        // Particles
        this.positionData = this.gpuComputationRenderer.createTexture();
        this.velocityData = this.gpuComputationRenderer.createTexture();
        this.positionData.image.data.set(sphereTextureData);
        this.velocityData.image.data.set(emptyTextureData);
        // Face
        this.positionFaceData = this.gpuComputationRenderer.createTexture();
        this.velocityFaceData = this.gpuComputationRenderer.createTexture();
        this.positionFaceData.image.data.set(emptyTextureData);
        this.velocityFaceData.image.data.set(emptyTextureData);
        // Morph
        this.positionMorphData = this.gpuComputationRenderer.createTexture();
        this.velocityMorphData = this.gpuComputationRenderer.createTexture();
        this.positionMorphData.image.data.set(emptyTextureData);
        this.velocityMorphData.image.data.set(emptyTextureData);
    }

    private initVariables() {
        // Particles - Position
        this.positionVariable = this.gpuComputationRenderer.addVariable('texturePosition',
            fragmentPositionShader, this.positionData);
        this.positionVariable.material.uniforms.u_delta = { value: 0 };
        this.positionVariable.material.uniforms.u_time = { value: 0 };
        this.positionVariable.material.uniforms.u_faceDetected = { value: false };
        this.positionVariable.material.uniforms.u_morphEnabled = { value: false };
        this.positionVariable.wrapS = THREE.RepeatWrapping;
        this.positionVariable.wrapT = THREE.RepeatWrapping;
        // Particles - Velocity
        this.velocityVariable = this.gpuComputationRenderer.addVariable('textureVelocity',
            fragmentVelocityShader, this.velocityData);
        this.velocityVariable.material.uniforms.u_delta = { value: 0 };
        this.velocityVariable.material.uniforms.u_time = { value: 0 };
        this.velocityVariable.material.uniforms.u_faceDetected = { value: false };
        this.velocityVariable.material.uniforms.u_morphEnabled = { value: false };
        this.velocityVariable.wrapS = THREE.RepeatWrapping;
        this.velocityVariable.wrapT = THREE.RepeatWrapping;
        // Face - Position
        this.positionFaceVariable = this.gpuComputationRenderer.addVariable('textureFacePosition',
            fragmentFacePositionShader, this.positionFaceData);
        this.positionFaceVariable.material.uniforms.u_delta = { value: 0 };
        this.positionFaceVariable.material.uniforms.u_time = { value: 0 };
        this.positionFaceVariable.material.uniforms.u_faceDetected = { value: false };
        this.positionFaceVariable.material.uniforms.u_morphEnabled = { value: false };
        this.positionFaceVariable.wrapS = THREE.RepeatWrapping;
        this.positionFaceVariable.wrapT = THREE.RepeatWrapping;
        // Face - Velocity
        this.velocityFaceVariable = this.gpuComputationRenderer.addVariable('textureFaceVelocity',
            fragmentFaceVelocityShader, this.velocityFaceData);
        this.velocityFaceVariable.material.uniforms.u_delta = { value: 0 };
        this.velocityFaceVariable.material.uniforms.u_time = { value: 0 };
        this.velocityFaceVariable.material.uniforms.u_faceDetected = { value: false };
        this.velocityFaceVariable.material.uniforms.u_morphEnabled = { value: false };
        this.velocityFaceVariable.wrapS = THREE.RepeatWrapping;
        this.velocityFaceVariable.wrapT = THREE.RepeatWrapping;
        // Morph - Position
        this.positionMorphVariable = this.gpuComputationRenderer.addVariable('textureMorphPosition',
            fragmentMorphPositionShader, this.positionMorphData);
        this.positionMorphVariable.material.uniforms.u_delta = { value: 0 };
        this.positionMorphVariable.material.uniforms.u_time = { value: 0 };
        this.positionMorphVariable.material.uniforms.u_faceDetected = { value: false };
        this.positionMorphVariable.material.uniforms.u_morphEnabled = { value: false };
        this.positionMorphVariable.wrapS = THREE.RepeatWrapping;
        this.positionMorphVariable.wrapT = THREE.RepeatWrapping;
        // Morph - Velocity
        this.velocityMorphVariable = this.gpuComputationRenderer.addVariable('textureMorphVelocity',
            fragmentMorphVelocityShader, this.velocityMorphData);
        this.velocityMorphVariable.material.uniforms.u_delta = { value: 0 };
        this.velocityMorphVariable.material.uniforms.u_time = { value: 0 };
        this.velocityMorphVariable.material.uniforms.u_faceDetected = { value: false };
        this.velocityMorphVariable.material.uniforms.u_morphEnabled = { value: false };
        this.velocityMorphVariable.wrapS = THREE.RepeatWrapping;
        this.velocityMorphVariable.wrapT = THREE.RepeatWrapping;
        // Dependencies
        this.gpuComputationRenderer.setVariableDependencies(this.positionVariable, [this.velocityVariable,
            this.positionVariable, this.positionFaceVariable, this.positionMorphVariable]);
        this.gpuComputationRenderer.setVariableDependencies(this.velocityVariable, [this.velocityVariable,
            this.positionVariable]);
        this.gpuComputationRenderer.setVariableDependencies(this.positionFaceVariable,
            [this.velocityFaceVariable, this.positionFaceVariable]);
        this.gpuComputationRenderer.setVariableDependencies(this.velocityFaceVariable,
            [this.velocityFaceVariable, this.positionFaceVariable]);
        this.gpuComputationRenderer.setVariableDependencies(this.positionMorphVariable,
            [this.velocityMorphVariable, this.positionMorphVariable]);
        this.gpuComputationRenderer.setVariableDependencies(this.velocityMorphVariable,
            [this.velocityMorphVariable, this.positionMorphVariable]);
    }

    private getEmptyTextureData() {
        let emptyData = [];
        for (let i = 0; i < this.textureArraySize; i += 4) {
            emptyData.push(0, 0, 0, 1);
        }
        return emptyData;
    }

    private getSphereTextureData() {
        let sphereData = [];
        for (let i = 0; i < this.textureArraySize; i += 4) {
            const radius = (1 - Math.pow(Math.random(), 3));
            const azimuth = Math.random() * Math.PI;
            const inclination = Math.random() * Math.PI * 2;
            sphereData.push(
                radius * Math.sin(azimuth) * Math.cos(inclination),
                radius * Math.cos(azimuth),
                radius * Math.sin(azimuth) * Math.sin(inclination),
                1
            );
        }
        return sphereData;
    }

}
