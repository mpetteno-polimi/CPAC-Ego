import type World from "./World";
import type {Clock} from "three";
import * as THREE from 'three';

export default class Loop {
    private world: World;
    private globalClock: Clock;
    private morphClock: Clock;
    private animationRequestId: number;
    isFaceDetected:  boolean;
    isMorphEnabled: boolean;

    constructor(world: World) {
        this.world = world;
        this.globalClock = new THREE.Clock;
        this.morphClock = new THREE.Clock;
    }

    start() {
        this.isFaceDetected = false;
        this.globalClock.start();
        this.animate();
    }

    stop() {
        this.globalClock.stop();
        cancelAnimationFrame(this.animationRequestId);
    }

    animate() {
        let delta = this.globalClock.getDelta();
        let elapsedTime = this.globalClock.getElapsedTime();
        this.render(elapsedTime, delta);
        this.animationRequestId = requestAnimationFrame(this.animate.bind(this));
    }

    render(elapsedTime: number, delta: number) {
        this.isFaceDetected ? this.handleMorphAnimation() : this.world.particles.detectFaces();
        this.world.particles.updateUniforms(elapsedTime, delta);
        //this.world.updateSettings();
        this.world.controls.update();
        //this.world.renderer.render(this.scene, this.camera);
        this.world.composer.render();
    }

    private handleMorphAnimation() {
        let morphElapsedTime = this.morphClock.getElapsedTime();
        if (!this.isMorphEnabled) {
            if (morphElapsedTime > 5) this.isMorphEnabled = true;
        } else if (morphElapsedTime > 20) {
            this.isMorphEnabled = false;
            this.morphClock = new THREE.Clock();
        }
    }

}