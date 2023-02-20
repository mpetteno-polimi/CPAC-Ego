import type World from "./World";

import * as THREE from "three";
import GPUComputation from "./GPUComputation";
import vertexShader from "../shaders/particles/vertexShader.glsl";
import fragmentShader from "../shaders/particles/fragmentShader.glsl";
import {config} from "../../config";

export default class ParticleSystem {
    particles: THREE.Points<THREE.BufferGeometry, THREE.Material>;
    particlesCount: number;
    textureWidth: number;
    textureHeight: number;
    gpuComputation: GPUComputation;
    protected geometry: THREE.BufferGeometry;
    protected material: THREE.ShaderMaterial;
    protected world: World;
    private isProcessingFace: boolean;

    constructor(world: World, visible: boolean = true) {
        this.world = world;
        this.particlesCount = config.scenes.world.particlesCount;
        this.addTexturesData();
        this.addGPUComputation();
        this.addGeometry();
        this.addMaterial();
        this.particles = new THREE.Points(this.geometry, this.material);
        this.world.scene.add(this.particles);
        visible ? this.show() : this.hide();
    }

    show() {
        this.particles.visible = true;
    }

    hide() {
        this.particles.visible = false;
    }

    resize(width, height) {
        this.material.uniforms.uResolution.value.x = width;
        this.material.uniforms.uResolution.value.y = height;
    }

    detectFaces() {
        this.world.faceMeshDetector.detectFaces().then((estimatedFaces) => {
            if (estimatedFaces.length != 0) {
                let estimatedFace = estimatedFaces[0];
                if (this.isFaceToUpdate()) {
                    this.world.musicGenerator.newFace();
                    this.isProcessingFace = true;
                    this.world.faceMeshDetector.processFaceDetection(
                        this, estimatedFace, this.textureWidth*this.textureHeight, this.onFaceProcessed);
                }
            } else {
                this.world.loop.isFaceDetected = false;
            }
        });
    }

    detectFaceForMusicGenerator() {
        this.world.faceMeshDetector.detectFaces().then((estimatedFaces) => {
            if (estimatedFaces.length != 0) {
                let estimatedFace = estimatedFaces[0];
                this.world.musicGenerator.updateFromFaceEstimation(estimatedFace);
            }
        })
    }

    updateMorphTarget(randomMorphTarget) {
        this.gpuComputation.updateGenerativeMorphTarget(randomMorphTarget);
        this.material.uniforms.uMorphTargetType.value = randomMorphTarget.type;
        // this.geometry.morphAttributes.position.push(targetPosition);
        // this.particles.updateMorphTargets();
    }

    updateUniforms(globalElapsedTime: number, faceMorphElapsedTime: number, targetMorphElapsedTime: number,
                   delta: number) {
        this.gpuComputation.compute({
            "globalElapsedTime": globalElapsedTime,
            "faceMorphElapsedTime": faceMorphElapsedTime,
            "targetMorphElapsedTime": targetMorphElapsedTime,
            "delta": Math.min(delta, 0.5),
            "isFaceDetected": this.world.loop.isFaceDetected,
            "isMorphEnabled": this.world.loop.isMorphEnabled,
            "faceMorphDuration": config.loop.faceDetectedMorphDuration,
            "targetMorphDuration": config.loop.morphDuration,
            "noiseFreq": this.world.settings.noiseFreq,
            "noiseAmp": this.world.settings.noiseAmp,
            "noiseRadius": this.world.settings.noiseRadius,
            "noiseSpeed": this.world.settings.noiseSpeed,
            "noiseType": this.world.settings.noiseType
        });
        this.material.uniforms.uTime.value = globalElapsedTime;
        this.material.uniforms.uFaceMorphElapsedTime.value = faceMorphElapsedTime;
        this.material.uniforms.uTargetMorphElapsedTime.value = targetMorphElapsedTime;
        this.material.uniforms.uDelta.value = Math.min(delta, 0.5);
        this.material.uniforms.uNoiseFreq.value = this.world.settings.noiseFreq;
        this.material.uniforms.uNoiseAmp.value = this.world.settings.noiseAmp;
        this.material.uniforms.uNoiseRadius.value = this.world.settings.noiseRadius;
        this.material.uniforms.uNoiseSpeed.value = this.world.settings.noiseSpeed;
        this.material.uniforms.uNoiseType.value = this.world.settings.noiseType;
        this.material.uniforms.uNoiseSeed.value = 2*Math.random()-1;
        this.material.uniforms.uFaceDetected.value = this.world.loop.isFaceDetected;
        this.material.uniforms.uMorphEnabled.value = this.world.loop.isMorphEnabled;
        this.material.uniforms.uParticlesPosition.value = this.gpuComputation.getCurrentParticlesPosition();
        this.material.uniforms.uPrimaryColor.value = new THREE.Color(this.world.settings.primaryColor);
        this.material.uniforms.uPrimaryVariant.value = new THREE.Color(this.world.settings.primaryVariant);
        this.material.uniforms.uSecondaryColor.value = new THREE.Color(this.world.settings.secondaryColor);
        this.material.uniforms.uSecondaryVariantColor.value = new THREE.Color(this.world.settings.secondaryVariantColor);
        this.material.uniforms.uBackgroundColor.value = new THREE.Color(this.world.settings.backgroundColor);
    }

    protected addGeometry() {
        this.geometry = new THREE.BufferGeometry();
        this.initGeometryVertices();
        this.initGeometryReferences();
        //this.geometry.morphAttributes.position = [];
    }

    protected addMaterial() {
        this.material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: "#extension GL_OES_standard_derivatives : enable"
            },
            side: THREE.DoubleSide,
            uniforms: {
                uTime: { value: 0 },
                uFaceMorphElapsedTime: { value: 0 },
                uTargetMorphElapsedTime: { value: 0 },
                uDelta: { value: 0 },
                uResolution: { value: new THREE.Vector2() },
                uNoiseFreq: { value: 0 },
                uNoiseAmp: { value: 0 },
                uNoiseRadius: { value: 0 },
                uNoiseSpeed: { value: 0 },
                uNoiseType: { value: 0 },
                uNoiseSeed: { value: 0 },
                uFaceDetected: { value: false },
                uMorphEnabled: { value: false },
                uFaceMorphDuration: { value: config.loop.faceDetectedMorphDuration },
                uTargetMorphDuration: { value: config.loop.morphDuration },
                uMorphTargetType: { value: 0 },
                uParticlesPosition: { value: null },
                uPrimaryColor: { value: new THREE.Color() },
                uPrimaryVariant: { value: new THREE.Color() },
                uSecondaryColor: { value: new THREE.Color() },
                uSecondaryVariantColor: { value: new THREE.Color() },
                uBackgroundColor: { value: new THREE.Color() }
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

    protected addTexturesData() {
        this.textureWidth = Math.sqrt(this.particlesCount);
        this.textureHeight = Math.sqrt(this.particlesCount);
    }

    protected addGPUComputation() {
        this.gpuComputation = new GPUComputation({
            texture_width: this.textureWidth,
            texture_height: this.textureHeight,
            renderer: this.world.renderer
        });
    }

    private onFaceProcessed(particles, event) {
        let faceTextureData = event.data[0];
        particles.gpuComputation.updateFaceTextureData(faceTextureData);
        particles.world.morphTargetGenerator.getRandomMorphTarget();
        particles.isProcessingFace = false;
        particles.world.loop.enableFaceDetected();
        particles.world.faceExpressionDetector.detectExpressions().then((estimatedExpression) => {
            let detection = estimatedExpression[0];
            if (detection) particles.world.musicGenerator.setSentiment(detection.expressions);
        });
        particles.world.musicGenerator.newFace();
        particles.world.musicGenerator.startPlayingSequence();
        particles.world.musicGenerator.musicPlayer.startDrone();
    }

    private initGeometryVertices() {
        const vertices = new Float32Array(this.particlesCount  * 3).fill(0);
        this.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    }

    private initGeometryReferences() {
        const references = new Float32Array(this.particlesCount * 2);
        for (let i = 0; i < references.length; i += 2) {
            const indexVertex = i / 2;
            references[i] = (indexVertex % this.textureWidth) / this.textureWidth;
            references[i + 1] = Math.floor(indexVertex / this.textureWidth) / this.textureHeight;
        }
        this.geometry.setAttribute('reference', new THREE.BufferAttribute(references, 2));
    }

    private isFaceToUpdate(): boolean {
        return !this.world.loop.isFaceDetected && !this.isProcessingFace;
    }

}