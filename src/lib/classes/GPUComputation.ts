import type {DataTexture} from "three";
import type {Variable} from "three/examples/jsm/misc/GPUComputationRenderer.js";

import * as THREE from "three";
import {GPUComputationRenderer} from "three/examples/jsm/misc/GPUComputationRenderer";
import fragmentParticlesPositionShader from "../shaders/gpu-computation/fragmentParticlesPositionShader.glsl";
import fragmentParticlesVelocityShader from "../shaders/gpu-computation/fragmentParticlesVelocityShader.glsl";
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
    private variables: {
        textureParticlesPosition: Variable,
        textureParticlesVelocity: Variable,
        textureFacePosition: Variable,
        textureFaceVelocity: Variable,
        textureMorphPosition: Variable,
        textureMorphVelocity: Variable
    };

    /* ########################## TEXTURES ############################# */
    private positionParticlesData: DataTexture;
    private velocityParticlesData: DataTexture;
    private positionFaceData: DataTexture;
    private velocityFaceData: DataTexture;
    private positionMorphData: DataTexture;
    private velocityMorphData: DataTexture;


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
        this.updateVariablesUniforms(options);
    }

    getCurrentParticlesPosition() {
        return this.gpuComputationRenderer.getCurrentRenderTarget(this.variables.textureParticlesPosition).texture;
    }

    updateFaceTextureData(positions: ArrayLike<number>) {
        this.positionFaceData.image.data.set(positions);
        this.positionFaceData.needsUpdate = true;
        let currentPosRenderTarget = this.gpuComputationRenderer.getCurrentRenderTarget(this.variables.textureFacePosition);
        this.gpuComputationRenderer.renderTexture(this.positionFaceData, currentPosRenderTarget);
    }

    updateMorphTextures(positions: ArrayLike<number>) {
        this.positionMorphData.image.data.set(positions);
        this.positionMorphData.needsUpdate = true;
        let currentPosRenderTarget = this.gpuComputationRenderer.getCurrentRenderTarget(this.variables.textureMorphPosition);
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
        this.addVariables();
        this.addVariableUniforms();
        this.addVariableDependencies();
    }

    private addVariables() {
        this.variables =  {
            'textureParticlesPosition': this.gpuComputationRenderer.addVariable('textureParticlesPosition',
                fragmentParticlesPositionShader, this.positionParticlesData),
            'textureParticlesVelocity': this.gpuComputationRenderer.addVariable('textureParticlesVelocity',
                fragmentParticlesVelocityShader, this.velocityParticlesData),
            'textureFacePosition': this.gpuComputationRenderer.addVariable('textureFacePosition',
                fragmentFacePositionShader, this.positionFaceData),
            'textureFaceVelocity': this.gpuComputationRenderer.addVariable('textureFaceVelocity',
                fragmentFaceVelocityShader, this.velocityFaceData),
            'textureMorphPosition': this.gpuComputationRenderer.addVariable('textureMorphPosition',
                fragmentMorphPositionShader, this.positionMorphData),
            'textureMorphVelocity': this.gpuComputationRenderer.addVariable('textureMorphVelocity',
                fragmentMorphVelocityShader, this.velocityMorphData),
        };
    }

    private addVariableDependencies() {
        // Particles
        this.gpuComputationRenderer.setVariableDependencies(this.variables.textureParticlesPosition,
            [this.variables.textureParticlesVelocity, this.variables.textureParticlesPosition,
                this.variables.textureFacePosition, this.variables.textureMorphPosition]);
        this.gpuComputationRenderer.setVariableDependencies(this.variables.textureParticlesVelocity,
            [this.variables.textureParticlesVelocity, this.variables.textureParticlesPosition]);
        // Face
        this.gpuComputationRenderer.setVariableDependencies(this.variables.textureFacePosition,
            [this.variables.textureFaceVelocity, this.variables.textureFacePosition]);
        this.gpuComputationRenderer.setVariableDependencies(this.variables.textureFaceVelocity,
            [this.variables.textureFaceVelocity, this.variables.textureFacePosition]);
        // Morph
        this.gpuComputationRenderer.setVariableDependencies(this.variables.textureMorphPosition,
            [this.variables.textureMorphVelocity, this.variables.textureMorphPosition]);
        this.gpuComputationRenderer.setVariableDependencies(this.variables.textureMorphVelocity,
            [this.variables.textureMorphVelocity, this.variables.textureMorphPosition]);
    }

    private addVariableUniforms() {
        Object.values(this.variables).forEach((variable) => {
            variable.material.uniforms.u_delta = { value: 0 };
            variable.material.uniforms.u_time = { value: 0 };
            variable.material.uniforms.u_noiseFreq = { value: 0 };
            variable.material.uniforms.u_noiseAmp = { value: 0 };
            variable.material.uniforms.u_noiseRadius = { value: 0 };
            variable.material.uniforms.u_noiseSpeed = { value: 0 };
            variable.material.uniforms.u_faceDetected = { value: false };
            variable.material.uniforms.u_morphEnabled = { value: false };
            variable.material.uniforms.u_faceMorphDuration = { value: 0 };
            variable.material.uniforms.u_targetMorphDuration = { value: 0 };
            variable.wrapS = THREE.RepeatWrapping;
            variable.wrapT = THREE.RepeatWrapping;
        })
    }

    private updateVariablesUniforms(options) {
        Object.values(this.variables).forEach((variable) => {
            variable.material.uniforms.u_delta.value = options["delta"];
            variable.material.uniforms.u_time.value = options["elapsedTime"];
            variable.material.uniforms.u_noiseFreq.value = options["noiseFreq"];
            variable.material.uniforms.u_noiseAmp.value = options["noiseAmp"];
            variable.material.uniforms.u_noiseSpeed.value = options["noiseSpeed"];
            variable.material.uniforms.u_noiseRadius.value = options["noiseRadius"];
            variable.material.uniforms.u_faceDetected.value = options["isFaceDetected"];
            variable.material.uniforms.u_morphEnabled.value = options["isMorphEnabled"];
            variable.material.uniforms.u_faceMorphDuration.value = options["faceMorphDuration"];
            variable.material.uniforms.u_targetMorphDuration.value = options["targetMorphDuration"];
        })
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
