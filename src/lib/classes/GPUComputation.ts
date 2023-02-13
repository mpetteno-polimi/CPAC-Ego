import type {DataTexture} from "three";
import type {Variable} from "three/examples/jsm/misc/GPUComputationRenderer.js";

import * as THREE from "three";
import {GPUComputationRenderer} from "three/examples/jsm/misc/GPUComputationRenderer";
import fragmentPositionShader from "../shaders/gpu-computation/fragmentParticlesPositionShader.glsl";
import fragmentVelocityShader from "../shaders/gpu-computation/fragmentParticlesVelocityShader.glsl";
import fragmentFacePositionShader from "../shaders/gpu-computation/fragmentFacePositionShader.glsl";
import fragmentMorphPositionShader from "../shaders/gpu-computation/fragmentMorphPositionShader.glsl";

export default class GPUComputation {
    textureWidth: number;
    textureHeight: number;
    texturePoints: number;
    textureArraySize: number;
    private gpuComputationRenderer: GPUComputationRenderer;

    /* ########################## PARTICLES ############################# */
    private positionParticlesData: DataTexture;
    private velocityParticlesData: DataTexture;
    private positionParticlesVariable: Variable;
    private velocityParticlesVariable: Variable;

    /* ########################## FACE ############################# */
    private positionFaceData: DataTexture;
    private positionFaceVariable: Variable;

    /* ########################## MORPH ############################# */
    private positionMorphData: DataTexture;
    private positionMorphVariable: Variable;


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

    compute(options) {
        this.gpuComputationRenderer.compute();
        let elapsedTime = options["elapsedTime"];
        let delta = options["delta"];
        let isFaceDetected = options["isFaceDetected"];
        let isMorphEnabled = options["isMorphEnabled"];
        let faceMorphDuration = options["faceMorphDuration"];
        let targetMorphDuration = options["targetMorphDuration"];
        // Particles - Position
        this.positionParticlesVariable.material.uniforms.u_delta.value = delta;
        this.positionParticlesVariable.material.uniforms.u_time.value = elapsedTime;
        this.positionParticlesVariable.material.uniforms.u_faceDetected.value = isFaceDetected;
        this.positionParticlesVariable.material.uniforms.u_morphEnabled.value = isMorphEnabled;
        this.positionParticlesVariable.material.uniforms.u_faceMorphDuration.value = faceMorphDuration;
        this.positionParticlesVariable.material.uniforms.u_targetMorphDuration.value = targetMorphDuration;
        // Particles - Velocity
        this.velocityParticlesVariable.material.uniforms.u_delta.value = delta;
        this.velocityParticlesVariable.material.uniforms.u_time.value = elapsedTime;
        this.velocityParticlesVariable.material.uniforms.u_faceDetected.value = isFaceDetected;
        this.velocityParticlesVariable.material.uniforms.u_morphEnabled.value = isMorphEnabled;
        this.velocityParticlesVariable.material.uniforms.u_faceMorphDuration.value = faceMorphDuration;
        this.velocityParticlesVariable.material.uniforms.u_targetMorphDuration.value = targetMorphDuration;
    }

    getCurrentParticlesPosition() {
        return this.gpuComputationRenderer.getCurrentRenderTarget(this.positionParticlesVariable).texture;
    }

    updateFaceTextureData(positions: ArrayLike<number>) {
        this.positionFaceData.image.data.set(positions);
        this.positionFaceData.needsUpdate = true;
        let currentPosRenderTarget = this.gpuComputationRenderer.getCurrentRenderTarget(this.positionFaceVariable);
        this.gpuComputationRenderer.renderTexture(this.positionFaceData, currentPosRenderTarget);
    }

    updateMorphTextures(positions: ArrayLike<number>) {
        this.positionMorphData.image.data.set(positions);
        this.positionMorphData.needsUpdate = true;
        let currentPosRenderTarget = this.gpuComputationRenderer.getCurrentRenderTarget(this.positionMorphVariable);
        this.gpuComputationRenderer.renderTexture(this.positionMorphData, currentPosRenderTarget);
    }

    private initTexturesData() {
        let emptyTextureData = this.getEmptyTextureData();
        let sphereTextureData = this.getSphereTextureData();
        // Particles
        this.positionParticlesData = this.gpuComputationRenderer.createTexture();
        this.velocityParticlesData = this.gpuComputationRenderer.createTexture();
        this.positionParticlesData.image.data.set(sphereTextureData);
        this.velocityParticlesData.image.data.set(emptyTextureData);
        // Face
        this.positionFaceData = this.gpuComputationRenderer.createTexture();
        this.positionFaceData.image.data.set(emptyTextureData);
        // Morph
        this.positionMorphData = this.gpuComputationRenderer.createTexture();
        this.positionMorphData.image.data.set(emptyTextureData);
    }

    private initVariables() {
        // Particles - Position
        this.positionParticlesVariable = this.gpuComputationRenderer.addVariable('textureParticlesPosition',
            fragmentPositionShader, this.positionParticlesData);
        this.positionParticlesVariable.material.uniforms.u_delta = { value: 0 };
        this.positionParticlesVariable.material.uniforms.u_time = { value: 0 };
        this.positionParticlesVariable.material.uniforms.u_faceDetected = { value: false };
        this.positionParticlesVariable.material.uniforms.u_morphEnabled = { value: false };
        this.positionParticlesVariable.material.uniforms.u_faceMorphDuration = { value: 0 };
        this.positionParticlesVariable.material.uniforms.u_targetMorphDuration = { value: 0 };
        this.positionParticlesVariable.wrapS = THREE.RepeatWrapping;
        this.positionParticlesVariable.wrapT = THREE.RepeatWrapping;
        // Particles - Velocity
        this.velocityParticlesVariable = this.gpuComputationRenderer.addVariable('textureParticlesVelocity',
            fragmentVelocityShader, this.velocityParticlesData);
        this.velocityParticlesVariable.material.uniforms.u_delta = { value: 0 };
        this.velocityParticlesVariable.material.uniforms.u_time = { value: 0 };
        this.velocityParticlesVariable.material.uniforms.u_faceDetected = { value: false };
        this.velocityParticlesVariable.material.uniforms.u_morphEnabled = { value: false };
        this.velocityParticlesVariable.material.uniforms.u_faceMorphDuration = { value: 0 };
        this.velocityParticlesVariable.material.uniforms.u_targetMorphDuration = { value: 0 };
        this.velocityParticlesVariable.wrapS = THREE.RepeatWrapping;
        this.velocityParticlesVariable.wrapT = THREE.RepeatWrapping;
        // Face - Position
        this.positionFaceVariable = this.gpuComputationRenderer.addVariable('textureFacePosition',
            fragmentFacePositionShader, this.positionFaceData);
        this.positionFaceVariable.wrapS = THREE.RepeatWrapping;
        this.positionFaceVariable.wrapT = THREE.RepeatWrapping;
        // Morph - Position
        this.positionMorphVariable = this.gpuComputationRenderer.addVariable('textureMorphPosition',
            fragmentMorphPositionShader, this.positionMorphData);
        this.positionMorphVariable.wrapS = THREE.RepeatWrapping;
        this.positionMorphVariable.wrapT = THREE.RepeatWrapping;
        // Dependencies
        this.gpuComputationRenderer.setVariableDependencies(this.positionParticlesVariable, [this.velocityParticlesVariable,
            this.positionParticlesVariable, this.positionFaceVariable, this.positionMorphVariable]);
        this.gpuComputationRenderer.setVariableDependencies(this.velocityParticlesVariable, [this.velocityParticlesVariable,
            this.positionParticlesVariable]);
        this.gpuComputationRenderer.setVariableDependencies(this.positionFaceVariable, [this.positionFaceVariable]);
        this.gpuComputationRenderer.setVariableDependencies(this.positionMorphVariable, [this.positionMorphVariable]);
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
