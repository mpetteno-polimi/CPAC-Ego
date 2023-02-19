import type {DataTexture} from "three";
import type {Variable} from "three/examples/jsm/misc/GPUComputationRenderer.js";

import * as THREE from "three";
import {GPUComputationRenderer} from "three/examples/jsm/misc/GPUComputationRenderer";
import fragmentParticlesPositionShader from "../shaders/gpu-computation/fragmentParticlesPositionShader.glsl";
import fragmentParticlesVelocityShader from "../shaders/gpu-computation/fragmentParticlesVelocityShader.glsl";
import fragmentMorphTargetPositionShader from "../shaders/gpu-computation/fragmentMorphTargetPositionShader.glsl";

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
    private positionInitData: DataTexture;

    /* ########################## RENDER TARGETS ############################# */
    private facePositionRenderTarget: THREE.WebGLRenderTarget;
    private morphTargetPositionRenderTarget: THREE.WebGLRenderTarget;
    private initialPositionRenderTarget: THREE.WebGLRenderTarget;

    /* ########################## SHADER MATERIALS ############################# */
    private fragmentMorphTargetPositionShader: THREE.ShaderMaterial;


    constructor(props) {
        this.textureWidth = props.texture_width;
        this.textureHeight = props.texture_height;
        this.texturePoints = this.textureWidth * this.textureHeight;
        this.textureArraySize = this.texturePoints * 4;
        this.gpuComputationRenderer = new GPUComputationRenderer(this.textureWidth, this.textureHeight, props.renderer);
        if (props.renderer.capabilities.isWebGL2 === false ) {
            this.gpuComputationRenderer.setDataType(THREE.HalfFloatType);
        }
        this.initTextures();
        this.initVariables();
        this.initShaderMaterials();
        this.initRenderTargets();
        const gpuComputationRendererError = this.gpuComputationRenderer.init();
        if (gpuComputationRendererError) {
            console.error('ERROR', gpuComputationRendererError);
        }
        this.renderInitialParticlesData();
    }

    compute(options) {
        this.updateVariablesUniforms(options);
        this.gpuComputationRenderer.compute();
    }

    getCurrentParticlesPosition() {
        return this.gpuComputationRenderer.getCurrentRenderTarget(this.variables.textureParticlesPosition).texture;
    }

    updateFaceTextureData(positions: ArrayLike<number>) {
        this.positionFaceData.image.data.set(positions);
        this.positionFaceData.needsUpdate = true;
        this.gpuComputationRenderer.renderTexture(this.positionFaceData, this.facePositionRenderTarget);
        Object.values(this.variables).forEach((variable) => {
            variable.material.uniforms.uTextureFacePosition.value = this.facePositionRenderTarget.texture;
            variable.material.uniformsNeedUpdate = true;
        })
    }

    updateGenerativeMorphTarget(randomMorphTarget) {
        this.positionMorphData.image.data.set(randomMorphTarget.positions);
        this.positionMorphData.needsUpdate = true;
        this.fragmentMorphTargetPositionShader.uniforms.uTextureMorphTargetPosition.value = this.positionMorphData
        this.fragmentMorphTargetPositionShader.uniforms.uMorphTargetType.value = randomMorphTarget.type;
        this.fragmentMorphTargetPositionShader.uniforms.uCanvasWidth.value = randomMorphTarget.canvasWidth;
        this.fragmentMorphTargetPositionShader.uniforms.uCanvasHeight.value = randomMorphTarget.canvasHeight;
        this.fragmentMorphTargetPositionShader.uniforms.uNoiseSeed.value = randomMorphTarget.noiseSeed;
        this.fragmentMorphTargetPositionShader.uniformsNeedUpdate = true;
        this.gpuComputationRenderer.doRenderTarget(this.fragmentMorphTargetPositionShader, this.morphTargetPositionRenderTarget);
        Object.values(this.variables).forEach((variable) => {
            variable.material.uniforms.uMorphTargetType.value = randomMorphTarget.type;
            variable.material.uniforms.uTextureMorphTargetPosition.value = this.morphTargetPositionRenderTarget.texture;
            variable.material.uniformsNeedUpdate = true;
        })
    }
    private initTextures() {
        let emptyTextureData = this.getEmptyTextureData();
        let sphereTextureData = this.getSphereTextureData();
        // Particles
        this.positionParticlesData = this.gpuComputationRenderer.createTexture();
        this.velocityParticlesData = this.gpuComputationRenderer.createTexture();
        this.positionParticlesData.image.data.set(sphereTextureData);
        this.velocityParticlesData.image.data.set(emptyTextureData);
        this.positionInitData = this.gpuComputationRenderer.createTexture();
        this.positionInitData.image.data.set(sphereTextureData);
        // Face
        this.positionFaceData = this.gpuComputationRenderer.createTexture();
        this.positionFaceData.image.data.set(emptyTextureData);
        // Morph
        this.positionMorphData = this.gpuComputationRenderer.createTexture();
    }

    private renderInitialParticlesData() {
        this.gpuComputationRenderer.renderTexture(this.positionInitData, this.initialPositionRenderTarget);
        Object.values(this.variables).forEach((variable) => {
            variable.material.uniforms.uTextureInitialParticlesPosition.value = this.initialPositionRenderTarget.texture;
            variable.material.uniformsNeedUpdate = true;
        })
    }

    private initVariables() {
        this.addVariables();
        this.addVariableUniforms();
        this.addVariableDependencies();
    }

    private initShaderMaterials() {
        let uniforms = this.getDefaultUniforms();
        uniforms["uCanvasWidth"] = { value: 0 };
        uniforms["uCanvasHeight"] = { value: 0 };
        uniforms["uNoiseSeed"] = { value: 0 };
        this.fragmentMorphTargetPositionShader = this.gpuComputationRenderer.createShaderMaterial(
            fragmentMorphTargetPositionShader, uniforms);
    }

    private initRenderTargets() {
        this.facePositionRenderTarget = this.createRenderTarget();
        this.morphTargetPositionRenderTarget = this.createRenderTarget();
        this.initialPositionRenderTarget = this.createRenderTarget();
    }

    private createRenderTarget() {
        return this.gpuComputationRenderer.createRenderTarget(
            this.textureWidth,
            this.textureHeight,
            THREE.ClampToEdgeWrapping,
            THREE.ClampToEdgeWrapping,
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
            uTime: { value: 0 },
            uFaceMorphElapsedTime: { value: 0 },
            uTargetMorphElapsedTime: { value: 0 },
            uDelta: { value: 0 },
            uNoiseFreq: { value: 0 },
            uNoiseAmp: { value: 0 },
            uNoiseRadius: { value: 0 },
            uNoiseSpeed: { value: 0 },
            uNoiseType: { value: 0 },
            uFaceDetected: { value: false },
            uMorphEnabled: { value: false },
            uFaceMorphDuration: { value: 0 },
            uTargetMorphDuration: { value: 0 },
            uMorphTargetType: { value: 0 },
            uTextureFacePosition: { value: null },
            uTextureMorphTargetPosition: { value: null },
            uTextureInitialParticlesPosition: { value: null }
        }
    }

    private updateVariablesUniforms(options) {
        Object.values(this.variables).forEach((variable) => {
            variable.material.uniforms.uTime.value = options["globalElapsedTime"];
            variable.material.uniforms.uFaceMorphElapsedTime.value = options["faceMorphElapsedTime"];
            variable.material.uniforms.uTargetMorphElapsedTime.value = options["targetMorphElapsedTime"];
            variable.material.uniforms.uDelta.value = options["delta"];
            variable.material.uniforms.uNoiseFreq.value = options["noiseFreq"];
            variable.material.uniforms.uNoiseAmp.value = options["noiseAmp"];
            variable.material.uniforms.uNoiseSpeed.value = options["noiseSpeed"];
            variable.material.uniforms.uNoiseRadius.value = options["noiseRadius"];
            variable.material.uniforms.uNoiseType.value = options["noiseType"];
            variable.material.uniforms.uFaceDetected.value = options["isFaceDetected"];
            variable.material.uniforms.uMorphEnabled.value = options["isMorphEnabled"];
            variable.material.uniforms.uFaceMorphDuration.value = options["faceMorphDuration"];
            variable.material.uniforms.uTargetMorphDuration.value = options["targetMorphDuration"];
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
