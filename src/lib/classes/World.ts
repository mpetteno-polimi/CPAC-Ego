import type FaceMeshDetector from "./FaceMeshDetector";

import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {config} from "../../config";
import Loop from "./Loop";
import ParticleSystem from "./ParticleSystem";

export default class World {
    scene: THREE.Scene;
    currentSizes: Sizes;
    private readonly container: HTMLElement;
    private videoInput: HTMLVideoElement;
    faceMeshDetector: FaceMeshDetector;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    loop: Loop;
    controls: OrbitControls;
    particles: ParticleSystem;
    private dracoLoader: DRACOLoader;
    private gltf: GLTFLoader;
    private gui: dat.GUI;
    private renderScene: RenderPass;
    bloomPass: any;
    composer: EffectComposer;
    settings: {
        bloomRadius: number,
        bloomThreshold: number,
        bloomStrength: number,
        distortion: number,
        zoom: number
    };

    constructor(options) {
        this.container = options.container
        this.videoInput = options.video
        this.currentSizes = {
            width: this.container.offsetWidth,
            height: this.container.offsetHeight,
            videoWidth: this.videoInput.width,
            videoHeight: this.videoInput.height
        };
        this.faceMeshDetector = options.faceMeshDetector;
        this.addCamera();
        this.addRenderer();
        this.addScene();
        this.addControls();
        //this.addGUI();
        this.addLoop();
        this.addPostProcessing();
        this.addLoaders();
        this.addObjects();
        //this.addLights();
        //this.addHelpers();
        this.container.append(this.renderer.domElement);
        this.resize();
    }

    start() {
        this.loop.start();
    }

    stop() {
        this.loop.stop();
    }

    resize() {
        this.currentSizes.width = this.container.offsetWidth;
        this.currentSizes.height = this.container.offsetHeight;
        this.renderer.setSize(this.currentSizes.width, this.currentSizes.height);
        this.composer.setSize(this.currentSizes.width, this.currentSizes.height);
        this.particles.resize();
        this.camera.aspect = this.currentSizes.width / this.currentSizes.height;
        this.camera.updateProjectionMatrix();
    }

    updateSettings() {
        this.bloomPass.threshold = this.settings.bloomThreshold;
        this.bloomPass.strength = this.settings.bloomStrength;
        this.bloomPass.radius = this.settings.bloomRadius;
        this.camera.zoom = this.settings.zoom;
    }

    private addCamera() {
        /* let frustumSize = 10;
        let aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.OrthographicCamera(
            -frustumSize * aspect / 2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            -frustumSize / 2,
            -1000,
            1000
        );*/
        this.camera = new THREE.PerspectiveCamera(
            config.threeJS.camera.fieldOfView,
            window.innerWidth / window.innerHeight,
            config.threeJS.camera.nearPlane,
            config.threeJS.camera.farPlane
        );
        this.camera.position.set(0, 0, 2.5);
        this.camera.lookAt(0, 0, 0);
    }

    private addRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(config.threeJS.scene.backgroundColor);
        this.renderer.physicallyCorrectLights = true;
        //this.renderer.outputEncoding = THREE.sRGBEncoding;
    }

    private addScene() {
        this.scene = new THREE.Scene();
    }

    private addLoop() {
        this.loop = new Loop(this);
    }

    private addControls() {
        this.controls = new OrbitControls(this.camera, this.container);
        this.controls.enableDamping = true;
        this.settings = {
            distortion: 0,
            bloomRadius: 0,
            bloomThreshold: 0,
            bloomStrength: 0,
            zoom: 1
        };
    }

    private addGUI() {
        this.gui = new dat.GUI();
        this.gui.add(this.settings, "distortion", 0, 3, 0.01);
        this.gui.add(this.settings, "bloomThreshold", 0, 10, 0.01);
        this.gui.add(this.settings, "bloomStrength", 0, 10, 0.01);
        this.gui.add(this.settings, "bloomRadius", 0, 10, 0.01);
        this.gui.add(this.settings, "zoom", 0, 10, 0.5);
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

    private addLoaders() {
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/");
        this.gltf = new GLTFLoader();
        this.gltf.setDRACOLoader(this.dracoLoader);
    }

    private addObjects() {
        this.particles = new ParticleSystem(this);
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