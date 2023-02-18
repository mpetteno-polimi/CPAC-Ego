import type World from "./World";
import type {Clock} from "three";
import * as THREE from 'three';
import {config} from "../../config";
import AutomationHelper from "./AutomationsHelper";

export default class Loop {
    private world: World;
    private globalClock: Clock;
    private morphClock: Clock;
    private faceDetectedClock: Clock;
    private animationRequestId: number;
    private automationsHelper: AutomationHelper;
    isFaceDetectionEnabled: boolean
    isFaceDetected:  boolean;
    isMorphEnabled: boolean;
    private morphStartTime: number;
    private faceDetectedStartTime: number;

    constructor(world: World) {
        this.world = world;
        this.automationsHelper = new AutomationHelper();
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
        let morphElapsedTimes = [elapsedTime, 0, 0];
        if (elapsedTime > config.loop.faceDetectionStartTime) {
            if (this.isFaceDetected) {
                morphElapsedTimes = this.handleMorphAnimation(elapsedTime);
            } else {
                let staticSphereParameters = this.automationsHelper.getStaticSphereParameters();
                this.world.updateParameters(staticSphereParameters);
                this.world.particles.detectFaces();
            }
        } else {
            let staticSphereParameters = this.automationsHelper.getStaticSphereParameters();
            this.world.updateParameters(staticSphereParameters);
        }
        // console.log("Global", morphElapsedTimes[0]);
        // console.log("Face", morphElapsedTimes[1]);
        // console.log("Morph", morphElapsedTimes[2]);
        if(this.isFaceDetected) this.world.particles.detectFaceForMusicGenerator();
        this.world.particles.updateUniforms(morphElapsedTimes[0], morphElapsedTimes[1], morphElapsedTimes[2], delta);
        this.world.updateSettings();
        this.world.controls.update();
        //this.world.renderer.render(this.scene, this.camera);
        this.world.composer.render();
    }

    enableFaceDetected() {
        this.isFaceDetected = true;
        this.faceDetectedStartTime = this.faceDetectedClock.getElapsedTime();
    }

    private handleMorphAnimation(elapsedTime: number) {
        let faceDetectedElapsedTime = this.faceDetectedClock.getElapsedTime();
        let morphElapsedTime = 0;
        if (faceDetectedElapsedTime > config.loop.faceDetectedMorphDuration) {
            morphElapsedTime = this.morphClock.getElapsedTime();
            if (!this.isMorphEnabled) {
                if (morphElapsedTime > config.loop.morphStart) {
                    this.morphStartTime = morphElapsedTime;
                    morphElapsedTime = 0;
                    this.isMorphEnabled = true;
                } else {
                    let staticFaceParameters = this.automationsHelper.getStaticFaceParameters();
                    this.world.updateParameters(staticFaceParameters);
                }
            } else {
                let morphProgressTime = morphElapsedTime - this.morphStartTime;
                if (morphProgressTime > config.loop.morphDuration) {
                    if (morphProgressTime > config.loop.morphDuration + config.loop.morphEnd) {
                        this.init();
                        return [0, 0, 0];
                    } else {
                        let staticMorphTargetParameters = this.automationsHelper.getStaticMorphTargetParameters();
                        this.world.updateParameters(staticMorphTargetParameters);
                        morphElapsedTime = morphProgressTime;
                    }
                } else {
                    let faceToMorphTargetParameters = this.automationsHelper.getFaceToMorphTargetParameters();
                    this.world.updateParameters(faceToMorphTargetParameters);
                    morphElapsedTime = morphProgressTime;
                }
            }
        } else {
            let sphereToFaceParameters = this.automationsHelper.getSphereToFaceParameters();
            this.world.updateParameters(sphereToFaceParameters);
        }
        return [elapsedTime, faceDetectedElapsedTime, morphElapsedTime]
    }

}