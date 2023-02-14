import type World from "./World";
import type {Clock} from "three";
import * as THREE from 'three';
import {config} from "../../config";

export default class Loop {
    private world: World;
    private globalClock: Clock;
    private morphClock: Clock;
    private faceDetectedClock: Clock;
    private animationRequestId: number;
    isFaceDetectionEnabled: boolean
    isFaceDetected:  boolean;
    isMorphEnabled: boolean;
    private currentUniformTime: number;
    private morphStartTime: number;
    private faceDetectedStartTime: number;

    constructor(world: World) {
        this.world = world;
    }

    start() {
        this.init();
        this.animate();
    }

    stop() {
        this.globalClock.stop();
        cancelAnimationFrame(this.animationRequestId);
    }

    init() {
        this.globalClock = new THREE.Clock();
        this.faceDetectedClock = new THREE.Clock();
        this.morphClock = new THREE.Clock();
        this.isFaceDetectionEnabled = false;
        this.isFaceDetected = false;
        this.isMorphEnabled = false;
    }

    animate() {
        let delta = this.globalClock.getDelta();
        let elapsedTime = this.globalClock.getElapsedTime();
        this.render(elapsedTime, delta);
        this.animationRequestId = requestAnimationFrame(this.animate.bind(this));
    }

    render(elapsedTime: number, delta: number) {
        //console.log("Global", elapsedTime)
        if (elapsedTime > config.threeJS.loop.faceDetectionStartTime) {
            if (this.isFaceDetected) {
                this.handleMorphAnimation()
            } else {
                this.world.particles.detectFaces();
                this.currentUniformTime = elapsedTime;
            }
        } else {
            this.currentUniformTime = elapsedTime;
        }
        //console.log("Uniform", this.currentUniformTime)
        this.world.particles.updateUniforms(this.currentUniformTime, delta);
        this.world.updateSettings();
        this.world.controls.update();
        //this.world.renderer.render(this.scene, this.camera);
        this.world.composer.render();
    }

    enableFaceDetected() {
        this.isFaceDetected = true;
        this.faceDetectedStartTime = this.faceDetectedClock.getElapsedTime();
    }

    private handleMorphAnimation() {
        let faceDetectedElapsedTime = this.faceDetectedClock.getElapsedTime();
        //console.log("Face", faceDetectedElapsedTime)
        if (faceDetectedElapsedTime > config.threeJS.loop.faceDetectedMorphDuration) {
            let morphElapsedTime = this.morphClock.getElapsedTime();
            //console.log("Morph", morphElapsedTime)
            if (!this.isMorphEnabled) {
                if (morphElapsedTime > config.threeJS.loop.morphStart) {
                    this.morphStartTime = morphElapsedTime;
                    this.isMorphEnabled = true;
                    this.currentUniformTime = 0;
                } else {
                    this.currentUniformTime = morphElapsedTime;
                }
            } else {
                let morphProgressTime = morphElapsedTime - this.morphStartTime;
                if (morphProgressTime > config.threeJS.loop.morphDuration) {
                    if (morphProgressTime > config.threeJS.loop.morphDuration + config.threeJS.loop.morphEnd) {
                        this.init();
                    }
                } else {
                    this.currentUniformTime = morphProgressTime;
                }
            }
        } else {
            this.currentUniformTime = faceDetectedElapsedTime;
        }
    }

}