import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {config} from "../../config";
import MSDFText from "./MSDFText";
import gsap from "gsap";

export default class SplashScreen {

    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    composer: EffectComposer;
    controls: OrbitControls;
    text: MSDFText;
    private readonly container: HTMLElement;
    private globalClock: THREE.Clock;
    private gui: dat.GUI;
    private renderScene: RenderPass;
    bloomPass: any;
    settings: {
        bloomRadius: number,
        bloomThreshold: number,
        bloomStrength: number,
        cameraDistance: number,
        noiseFreq: number,
        noiseAmp: number,
        noiseRadius: number,
        noiseSpeed: number,
        noiseType: number,
        progress1: number,
        progress2: number,
        progress3: number,
        progress4: number,
        primaryColor: number,
        primaryVariant: number,
        secondaryColor: number,
        secondaryVariantColor: number,
        backgroundColor: number
    };


    constructor(options) {
        this.container = options.container
        this.settings = {
            bloomRadius: 0,
            bloomThreshold: 0,
            bloomStrength: 0,
            cameraDistance: 1000,
            noiseFreq: 15,
            noiseAmp: 0.3,
            noiseRadius: 1,
            noiseSpeed: 3,
            noiseType: 4,
            progress1: 0,
            progress2: 0,
            progress3: 0,
            progress4: 0,
            primaryColor: config.colors.primary,
            primaryVariant: config.colors.primaryVariant,
            secondaryColor: config.colors.secondary,
            secondaryVariantColor: config.colors.secondaryVariant,
            backgroundColor: config.colors.background
        };
        this.addCamera();
        this.addRenderer();
        this.addScene();
        this.addControls();
        this.addGUI();
        this.addPostProcessing();
        this.addObjects();
        //this.addLights();
        //this.addHelpers();
        this.container.append(this.renderer.domElement);
        this.resize();
    }

    render() {
        this.composer.render();
    }

    start() {
        this.globalClock = new THREE.Clock();
        this.update();
        this.animate();
    }

    animate() {
        if (config.scenes.splashScreen.automateParameters) {
            let duration = 2, stagger = 0.5;
            let tl = gsap.timeline({onComplete: () => {}, repeat: -1, repeatDelay: 5});
            tl.startTime(0);
            tl.to(this.settings, { progress1: 1, duration: duration }, 0);
            tl.to(this.settings, { progress2: 1, duration: duration }, stagger);
            tl.to(this.settings, { progress3: 1, duration: duration }, stagger*2);
            tl.to(this.settings, { progress4: 1, duration: duration }, stagger*3);
            tl.to(this.settings, { bloomStrength: 2.3, duration: duration/2, ease: "power2.in" }, 0);
            tl.to(this.settings, { bloomRadius: 1.7, duration: duration/2, ease: "power2.in" }, 0);
            tl.to(this.settings, { bloomStrength: 0, duration: duration/2, ease: "power2.in" }, duration/2);
            tl.to(this.settings, { bloomRadius: 0, duration: duration/2, ease: "power2.in" }, duration/2);
        }
    }

    update() {
        this.text.updateUniforms({
            uProgress1: this.settings.progress1,
            uProgress2: this.settings.progress2,
            uProgress3: this.settings.progress3,
            uProgress4: this.settings.progress4,
            uTime: this.globalClock.getElapsedTime(),
            uPrimaryColor: this.settings.primaryColor,
            uPrimaryVariant: this.settings.primaryVariant,
            uSecondaryColor: this.settings.secondaryColor,
            uSecondaryVariantColor: this.settings.secondaryVariantColor,
            uBackgroundColor: this.settings.backgroundColor,
        })
        this.updateSettings();
        this.controls.update();
        this.render();
        requestAnimationFrame(this.update.bind(this));
    }

    resize() {
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.composer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    }

    updateSettings() {
        this.bloomPass.threshold = this.settings.bloomThreshold;
        this.bloomPass.strength = this.settings.bloomStrength;
        this.bloomPass.radius = this.settings.bloomRadius;
        this.camera.position.setZ(this.settings.cameraDistance);
    }

    private addCamera() {
        this.camera = new THREE.PerspectiveCamera(
            config.scenes.splashScreen.camera.fieldOfView,
            window.innerWidth / window.innerHeight,
            config.scenes.splashScreen.camera.nearPlane,
            config.scenes.splashScreen.camera.farPlane);
    }

    private addRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(config.colors.background);
        this.renderer.physicallyCorrectLights = true;
        //this.renderer.outputEncoding = THREE.sRGBEncoding;
    }

    private addScene() {
        this.scene = new THREE.Scene();
    }

    private addControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    private addGUI() {
        this.gui = new dat.GUI({ autoPlace: true });
        this.gui.domElement.id = 'splash-screen-gui';
        let cameraFolder = this.gui.addFolder(`Camera`);
        cameraFolder.add(this.settings, "cameraDistance", 0, 5000, 100);
        let colorsFolder = this.gui.addFolder(`Color Palette`);
        colorsFolder.addColor(this.settings, "primaryColor");
        colorsFolder.addColor(this.settings, "primaryVariant");
        colorsFolder.addColor(this.settings, "secondaryColor");
        colorsFolder.addColor(this.settings, "secondaryVariantColor");
        colorsFolder.addColor(this.settings, "backgroundColor").onChange((color) => {
            this.settings.backgroundColor = color;
            this.renderer.setClearColor(color);
        });
        let progressFolder = this.gui.addFolder(`Progress`);
        progressFolder.add(this.settings, "progress1", 0, 1, 0.01);
        progressFolder.add(this.settings, "progress2", 0, 1, 0.01);
        progressFolder.add(this.settings, "progress3", 0, 1, 0.01);
        progressFolder.add(this.settings, "progress4", 0, 1, 0.01);
        let noiseFolder = this.gui.addFolder(`Noise`);
        noiseFolder.add(this.settings, "noiseAmp", 0, 2, 0.01);
        noiseFolder.add(this.settings, "noiseFreq", 0, 100, 0.01);
        noiseFolder.add(this.settings, "noiseRadius", 0, 20, 0.01);
        noiseFolder.add(this.settings, "noiseSpeed", 0, 20, 0.01);
        noiseFolder.add(this.settings, "noiseType", [0, 1, 2, 3, 4, 5, 6]);
        let postProcessingFolder = this.gui.addFolder(`Post Processing`);
        postProcessingFolder.add(this.settings, "bloomThreshold", 0, 10, 0.01);
        postProcessingFolder.add(this.settings, "bloomStrength", 0, 10, 0.01);
        postProcessingFolder.add(this.settings, "bloomRadius", 0, 10, 0.01);
    }

    private addPostProcessing() {
        this.renderScene = new RenderPass(this.scene, this.camera);
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        this.bloomPass.threshold = this.settings.bloomThreshold;
        this.bloomPass.strength = this.settings.bloomStrength;
        this.bloomPass.radius = this.settings.bloomRadius;
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(this.renderScene);
        this.composer.addPass(this.bloomPass);
    }

    private addObjects() {
        this.text = new MSDFText(this);
    }

    private addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0.5, 0, 0.866); // about 60°
        this.scene.add(directionalLight);
    }

    private addHelpers() {
        let axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
        let gridHelper = new THREE.GridHelper(10, 10);
        this.scene.add(gridHelper);
    }

}