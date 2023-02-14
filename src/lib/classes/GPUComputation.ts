import type {DataTexture} from "three";
import type {Variable} from "three/examples/jsm/misc/GPUComputationRenderer.js";

import * as THREE from "three";
import {GPUComputationRenderer} from "three/examples/jsm/misc/GPUComputationRenderer";
import fragmentParticlesPositionShader from "../shaders/gpu-computation/fragmentParticlesPositionShader.glsl";
import fragmentParticlesVelocityShader from "../shaders/gpu-computation/fragmentParticlesVelocityShader.glsl";
import fragmentMorphTargetMaskShader from "../shaders/gpu-computation/fragmentMorphTargetMaskShader.glsl";

export default class GPUComputation {
    textureWidth: number;
    textureHeight: number;
    texturePoints: number;
    textureArraySize: number;
    private gpuComputationRenderer: GPUComputationRenderer;
    private variables: {
        textureParticlesPosition: Variable,
        textureParticlesVelocity: Variable
    };

    /* ########################## TEXTURES ############################# */
    private positionParticlesData: DataTexture;
    private velocityParticlesData: DataTexture;
    private positionFaceData: DataTexture;
    private positionMorphData: DataTexture;

    /* ########################## RENDER TARGETS ############################# */
    private facePositionRenderTarget: THREE.WebGLRenderTarget;
    private morphTargetPositionRenderTarget: THREE.WebGLRenderTarget;
    private morphTargetMaskRenderTarget: THREE.WebGLRenderTarget;

    /* ########################## SHADER MATERIALS ############################# */
    private fragmentMorphTargetMaskShader: THREE.ShaderMaterial;


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
        this.initShaderMaterials();
        this.initRenderTargets();
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
        this.gpuComputationRenderer.renderTexture(this.positionFaceData, this.facePositionRenderTarget);
        Object.values(this.variables).forEach((variable) => {
            variable.material.uniforms.u_textureFacePosition.value = this.facePositionRenderTarget.texture;
            variable.material.uniformsNeedUpdate = true;
        })
    }

    updateGenerativeMorphTarget(randomMorphTarget) {
        this.positionMorphData.image.data.set(randomMorphTarget.positions);
        this.positionMorphData.needsUpdate = true;
        this.gpuComputationRenderer.renderTexture(this.positionMorphData, this.morphTargetPositionRenderTarget);
        if (randomMorphTarget.type == 1) { // TODO - method to check if target type is generative
            this.gpuComputationRenderer.doRenderTarget(this.fragmentMorphTargetMaskShader, this.morphTargetMaskRenderTarget);
        }
        Object.values(this.variables).forEach((variable) => {
            variable.material.uniforms.u_morphTargetType.value = randomMorphTarget.type;
            variable.material.uniforms.u_textureMorphTargetPosition.value = this.morphTargetPositionRenderTarget.texture;
            variable.material.uniforms.u_textureMorphTargetMask.value = this.morphTargetMaskRenderTarget.texture;
            variable.material.uniformsNeedUpdate = true;
        })
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

    private initShaderMaterials() {
        this.fragmentMorphTargetMaskShader = this.gpuComputationRenderer.createShaderMaterial(
            fragmentMorphTargetMaskShader, this.getDefaultUniforms()
        );
    }

    private initRenderTargets() {
        this.facePositionRenderTarget = this.createRenderTarget();
        this.morphTargetPositionRenderTarget = this.createRenderTarget();
        this.morphTargetMaskRenderTarget = this.createRenderTarget();
    }

    private createRenderTarget() {
        return this.gpuComputationRenderer.createRenderTarget(
            this.textureWidth,
            this.textureHeight,
            THREE.RepeatWrapping,
            THREE.RepeatWrapping,
            THREE.NearestFilter,
            THREE.NearestFilter
        )
    }

    private addVariables() {
        this.variables =  {
            'textureParticlesPosition': this.gpuComputationRenderer.addVariable('textureParticlesPosition',
                fragmentParticlesPositionShader, this.positionParticlesData),
            'textureParticlesVelocity': this.gpuComputationRenderer.addVariable('textureParticlesVelocity',
                fragmentParticlesVelocityShader, this.velocityParticlesData)
        };

    }

    private addVariableDependencies() {
        this.gpuComputationRenderer.setVariableDependencies(this.variables.textureParticlesPosition,
            [this.variables.textureParticlesVelocity, this.variables.textureParticlesPosition]);
        this.gpuComputationRenderer.setVariableDependencies(this.variables.textureParticlesVelocity,
            [this.variables.textureParticlesVelocity, this.variables.textureParticlesPosition]);
    }

    private addVariableUniforms() {
        Object.values(this.variables).forEach((variable) => {
            variable.material.uniforms = this.getDefaultUniforms();
        })
    }

    private getDefaultUniforms() {
        return {
            u_delta: { value: 0 },
            u_time: { value: 0 },
            u_noiseFreq: { value: 0 },
            u_noiseAmp: { value: 0 },
            u_noiseRadius: { value: 0 },
            u_noiseSpeed: { value: 0 },
            u_faceDetected: { value: false },
            u_morphEnabled: { value: false },
            u_faceMorphDuration: { value: 0 },
            u_targetMorphDuration: { value: 0 },
            u_morphTargetType: { value: 0 },
            u_textureFacePosition: { value: null },
            u_textureMorphTargetPosition: { value: null },
            u_textureMorphTargetMask: { value: null }
        }
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
