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
    private faceFlattener: Worker;
    private isProcessingFace: boolean;

    constructor(world: World, visible: boolean = true) {
        this.world = world;
        this.particlesCount = config.threeJS.scene.particlesCount;
        this.addTexturesData();
        this.addWorkers();
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
                        this.textureWidth * this.textureHeight * 4,
                        this.world.currentSizes,
                        config.threeJS.scene.triangulateFace,
                        config.threeJS.scene.faceScaleFactor
                    ]);
                    this.world.musicGenerator.updateFromFaceEstimation(estimatedFace);
                }
            } else {
                this.world.loop.isFaceDetected = false;
                this.world.musicGenerator.stopPlayingSequence();
            }
        });
    }

    updateMorphTarget(randomMorphTarget) {
        this.gpuComputation.updateGenerativeMorphTarget(randomMorphTarget);
        this.material.uniforms.u_morphTargetType.value = randomMorphTarget.type;
        // this.geometry.morphAttributes.position.push(targetPosition);
        // this.particles.updateMorphTargets();
    }

    updateUniforms(elapsedTime: number, delta: number) {
        this.gpuComputation.compute({
            "elapsedTime": elapsedTime,
            "delta": Math.min(delta, 0.5),
            "isFaceDetected": this.world.loop.isFaceDetected,
            "isMorphEnabled": this.world.loop.isMorphEnabled,
            "faceMorphDuration": config.threeJS.loop.faceDetectedMorphDuration,
            "targetMorphDuration": config.threeJS.loop.morphDuration,
            "noiseFreq": this.world.settings.noiseFreq,
            "noiseAmp": this.world.settings.noiseAmp,
            "noiseRadius": this.world.settings.noiseRadius,
            "noiseSpeed": this.world.settings.noiseSpeed
        });
        this.material.uniforms.u_delta.value = Math.min(delta, 0.5);
        this.material.uniforms.u_time.value = elapsedTime;
        this.material.uniforms.u_noiseFreq.value = this.world.settings.noiseFreq;
        this.material.uniforms.u_noiseAmp.value = this.world.settings.noiseAmp;
        this.material.uniforms.u_noiseRadius.value = this.world.settings.noiseRadius;
        this.material.uniforms.u_noiseSpeed.value = this.world.settings.noiseSpeed;
        this.material.uniforms.u_faceDetected.value = this.world.loop.isFaceDetected;
        this.material.uniforms.u_morphEnabled.value = this.world.loop.isMorphEnabled;
        this.material.uniforms.u_particlesPosition.value = this.gpuComputation.getCurrentParticlesPosition();
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
                u_delta: { value: 0 },
                u_time: { value: 0 },
                u_resolution: { value: new THREE.Vector2() },
                u_noiseFreq: { value: 0 },
                u_noiseAmp: { value: 0 },
                u_noiseRadius: { value: 0 },
                u_noiseSpeed: { value: 0 },
                u_faceDetected: { value: false },
                u_morphEnabled: { value: false },
                u_faceMorphDuration: { value: config.threeJS.loop.faceDetectedMorphDuration },
                u_targetMorphDuration: { value: config.threeJS.loop.morphDuration },
                u_morphTargetType: { value: 0 },
                u_particlesPosition: { value: null }
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

    protected addWorkers() {
        this.faceFlattener = new Worker(new URL('../workers/face-flattener.js', import.meta.url), {
            type: 'module'
        });
        this.faceFlattener.onmessage = (event) => {
            let faceTextureData = event.data[0];
            this.gpuComputation.updateFaceTextureData(faceTextureData);
            this.world.morphTargetGenerator.getRandomMorphTarget();
            this.isProcessingFace = false;
            this.world.loop.enableFaceDetected();
            this.world.faceExpressionDetector.detectExpressions().then((estimatedExpression) => {
                let detection = estimatedExpression[0];
                if (detection) this.world.musicGenerator.setSentiment(detection.expressions);
            });
            this.world.musicGenerator.startPlayingSequence();
            this.world.musicGenerator.newFace();
        }
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