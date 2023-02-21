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
        this.world.musicGenerator.stopPlayingSequence();
        this.world.musicGenerator.musicPlayer.stopDrone();
    }

    animate() {
        let delta = this.globalClock.getDelta();
        let elapsedTime = this.globalClock.getElapsedTime();
        this.render(elapsedTime, delta);
        this.animationRequestId = requestAnimationFrame(this.animate.bind(this));
    }

    render(elapsedTime: number, delta: number) {
        let timeControls = {
            globalElapsedTime: elapsedTime,
            faceDetectedElapsedTime: 0,
            morphElapsedTime: 0
        }
        let parameters = this.automationsHelper.getStaticSphereParameters(timeControls);
        if (elapsedTime > config.loop.faceDetectionStartTime) {
            if (this.isFaceDetected) {
                this.world.particles.detectFaceForMusicGenerator();
                let controls = this.handleMorphAnimation(timeControls, parameters);
                timeControls = controls[0];
                parameters = controls[1];
            } else {
                this.world.particles.detectFaces();
            }
        }
        // console.log("Global", morphElapsedTimes[0]);
        // console.log("Face", morphElapsedTimes[1]);
        // console.log("Morph", morphElapsedTimes[2]);
        this.world.animate(parameters);
        this.world.particles.updateUniforms(timeControls.globalElapsedTime, timeControls.faceDetectedElapsedTime,
            timeControls.morphElapsedTime, delta);
        this.world.updateSettings();
        this.world.controls.update();
        //this.world.renderer.render(this.scene, this.camera);
        this.world.composer.render();
    }

    enableFaceDetected() {
        this.isFaceDetected = true;
        this.faceDetectedStartTime = this.faceDetectedClock.getElapsedTime();
    }

    private handleMorphAnimation(timeControls, parameters) {
        let updatedTimeControls = {
            globalElapsedTime: timeControls.globalElapsedTime,
            faceDetectedElapsedTime: this.faceDetectedClock.getElapsedTime(),
            morphElapsedTime: timeControls.morphElapsedTime
        }
        let updatedParameters = parameters
        if (updatedTimeControls.faceDetectedElapsedTime > config.loop.faceDetectedMorphDuration) {
            updatedTimeControls.morphElapsedTime = this.morphClock.getElapsedTime();
            if (!this.isMorphEnabled) {
                if (updatedTimeControls.morphElapsedTime > config.loop.morphStart) {
                    this.morphStartTime = updatedTimeControls.morphElapsedTime;
                    updatedTimeControls.morphElapsedTime = 0;
                    this.isMorphEnabled = true;
                } else {
                    updatedParameters = this.automationsHelper.getStaticFaceParameters(updatedTimeControls);
                }
            } else {
                let morphProgressTime = updatedTimeControls.morphElapsedTime - this.morphStartTime;
                if (morphProgressTime > config.loop.morphDuration) {
                    if (morphProgressTime > config.loop.morphDuration + config.loop.morphEnd) {
                        this.init();
                        return [{
                            globalElapsedTime: 0,
                            faceDetectedElapsedTime: 0,
                            morphElapsedTime: 0
                        }, this.automationsHelper.getStaticSphereParameters(updatedTimeControls)]
                    } else {
                        updatedTimeControls.morphElapsedTime = morphProgressTime;
                        updatedParameters = this.automationsHelper.getStaticMorphTargetParameters(updatedTimeControls);
                    }
                } else {
                    updatedTimeControls.morphElapsedTime = morphProgressTime;
                    updatedParameters = this.automationsHelper.getFaceToMorphTargetParameters(updatedTimeControls);
                }
            }
        } else {
            updatedParameters = this.automationsHelper.getSphereToFaceParameters(updatedTimeControls);
        }
        return [updatedTimeControls, updatedParameters]
    }

}