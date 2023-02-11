import type World from "./World";
import type {Clock} from "three";
import * as THREE from 'three';

export default class Loop {
    private world: World;
    private clock: Clock;
    private animationRequestId: number;
    isFaceDetected:  boolean;
    isAnimationModeActive: boolean;

    constructor(world: World) {
        this.world = world;
        this.clock = new THREE.Clock;
    }

    start() {
        this.isFaceDetected = false;
        this.animate();
    }

    stop() {
        cancelAnimationFrame(this.animationRequestId);
    }

    animate() {
        let delta = this.clock.getDelta();
        let elapsedTime = this.clock.getElapsedTime();
        this.render(elapsedTime, delta);
        this.animationRequestId = requestAnimationFrame(this.animate.bind(this));
    }

    render(elapsedTime: number, delta: number) {
        if (!this.isAnimationModeActive) {
            this.world.particles.update(elapsedTime, delta);
        } else {
            this.isAnimationModeActive = true;
            this.world.particles.startMorphAnimation();
        }
        //this.world.updateSettings();
        this.world.controls.update();
        //this.world.renderer.render(this.scene, this.camera);
        this.world.composer.render();
    }

}