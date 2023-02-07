import type World from "./World";

import * as THREE from "three";
import GPUComputation from "./GPUComputation";
import vertexShader from "../shaders/particles/vertexShader.glsl";
import fragmentShader from "../shaders/particles/fragmentShader.glsl";
import {config} from "../../config";

export default class ParticleSystem {
    protected bufferGeometry: THREE.BufferGeometry;
    protected material: THREE.ShaderMaterial;
    protected readonly particles: THREE.Points<THREE.BufferGeometry, THREE.Material>;
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
            this.gpuComputation.updateFaceTextures(event.data[0][0], event.data[0][1]);
            this.isProcessingFace = false;
            this.world.loop.isFaceDetected = true;
        }
        this.addGPUComputation();
        this.addGeometry();
        this.addMaterial();
        this.particles = new THREE.Points(this.bufferGeometry, this.material);
        this.addMorph();
        this.world.scene.add(this.particles);
        visible ? this.show() : this.hide();
    }

    protected addGeometry() {
        this.bufferGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array(this.gpuComputation.texturePoints  * 3).fill(0);
        const references = new Float32Array(this.gpuComputation.texturePoints * 2);
        for (let i = 0; i < references.length; i += 2) {
            const indexVertex = i / 2;
            references[i] = (indexVertex % this.gpuComputation.textureWidth) / this.gpuComputation.textureWidth;
            references[i + 1] = Math.floor(indexVertex / this.gpuComputation.textureWidth) / this.gpuComputation.textureHeight;
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
                u_delta: {type: "f", value: 0},
                u_time: {type: "f", value: 0},
                u_distortion: {type: "f", value: 0},
                u_resolution: {type: "v2", value: new THREE.Vector2()},
                u_uvRate: {value: new THREE.Vector2(1, 1)},
                u_texturePosition: {value: null},
                u_textureVelocity: {value: null}
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthTest: false,
            depthWrite: false
        });
    }

    protected addMorph() {
        this.material.morphTargets = true;
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

    updateDetectedFace() {
        this.world.faceMeshDetector.detectFaces().then((estimatedFaces) => {
            if (estimatedFaces.length != 0) {
                if (this.isFaceToUpdate()) {
                    this.isProcessingFace = true;
                    this.faceFlattener.postMessage([
                        estimatedFaces[0],
                        this.gpuComputation.textureArraySize,
                        this.world.currentSizes,
                        config.threeJS.scene.triangulateFace
                    ]);
                }
            } else {
                this.world.loop.isFaceDetected = false;
            }
        });
    }

    updateUniforms(elapsedTime: number, delta: number) {
        if (this.gpuComputation) {
            this.gpuComputation.compute(delta, this.world.loop.isFaceDetected);
            this.material.uniforms.u_texturePosition.value = this.gpuComputation.getCurrentTexturePosition();
            this.material.uniforms.u_textureVelocity.value = this.gpuComputation.getCurrentTextureVelocity();
        }
        this.material.uniforms.u_delta.value = delta;
        this.material.uniforms.u_time.value = elapsedTime;
        this.material.uniforms.u_distortion.value = this.world.settings.distortion;
    }


    private isFaceToUpdate(): boolean {
        return !this.world.loop.isFaceDetected && !this.isProcessingFace;
    }

}