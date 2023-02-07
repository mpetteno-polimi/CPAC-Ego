import type World from "./World";
import type {Clock} from "three";
import * as THREE from 'three'
import gsap from "gsap";

export default class Loop {
    private world: World;
    private clock: Clock;
    private animationRequestId: number;
    isFaceDetected:  boolean;
    private isAnimationModeActive: boolean;

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

/*    textureToFaceAnimation() {
        this.isAnimationModeActive = true;
        let tl = gsap.timeline({
            onComplete: () => {
                this.isAnimationModeActive = false;
                this.world.camera.position.set(0, 0, 2);
            },
            repeat: 0,
            repeatDelay: 1
        });
        tl.startTime(4);
        tl.to(this.world.camera, {
            zoom: 10,
            duration: 6,
            onUpdate: () => this.world.camera.updateProjectionMatrix()
        }, 0);
        tl.to(this.world.bloomPass, {
            strength: 10,
            duration: 6,
            ease: "power2.out"
        }, 0);
        tl.add(() => {this.world.particleFace.show()}, 6);
        tl.to(this.world.camera, {
            zoom: 1,
            duration: 6,
            onUpdate: () => this.world.camera.updateProjectionMatrix()
        },6);
        tl.to(this.world.bloomPass, {
            strength: 0,
            duration: 6,
            ease: "power2.out"
        }, 6);
        tl.add(() => {this.world.particleTexture.hide()}, 12);
    }*/

    render(elapsedTime: number, delta: number) {
        this.world.particles.updateDetectedFace();
        this.world.particles.updateUniforms(elapsedTime, delta);
        //this.world.updateSettings();
        this.world.controls.update();
        //this.world.renderer.render(this.scene, this.camera);
        this.world.composer.render();
    }

}