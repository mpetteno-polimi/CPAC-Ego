import type FaceMeshDetector from "./FaceMeshDetector";
import type FaceExpressionDetector from "./FaceExpressionDetector";
import type MusicGenerator from "./MusicGenerator";

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
import MorphTargetGenerator from "./MorphTargetGenerator";

export default class World {
    scene: THREE.Scene;
    private readonly container: HTMLElement;
    faceMeshDetector: FaceMeshDetector;
    faceExpressionDetector: FaceExpressionDetector;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    loop: Loop;
    controls: OrbitControls;
    particles: ParticleSystem;
    morphTargetGenerator: MorphTargetGenerator;
    musicGenerator: MusicGenerator;
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
        cameraDistance: number,
        noiseFreq: number,
        noiseAmp: number,
        noiseRadius: number,
        noiseSpeed: number,
        noiseType: number,
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
            cameraDistance: 2.5,
            noiseFreq: 15,
            noiseAmp: 0.3,
            noiseRadius: 1,
            noiseSpeed: 3,
            noiseType: 4,
            primaryColor: config.colors.primary,
            primaryVariant: config.colors.primaryVariant,
            secondaryColor: config.colors.secondary,
            secondaryVariantColor: config.colors.secondaryVariant,
            backgroundColor: config.colors.background
        };
        this.faceMeshDetector = options.faceMeshDetector;
        this.faceExpressionDetector = options.faceExpressionDetector;
        this.musicGenerator = options.musicGenerator;
        this.addCamera();
        this.addRenderer();
        this.addScene();
        this.addControls();
        this.addGUI();
        this.addLoop();
        this.addPostProcessing();
        //this.addLoaders();
        this.addObjects();
        //this.addLights();
        //this.addHelpers();
        this.container.append(this.renderer.domElement);
        this.resize();
    }

    start() {
        this.loop.start();
        this.musicGenerator.newFace();
    }

    stop() {
        this.loop.stop();
    }

    resize() {
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.composer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.particles.resize(this.container.offsetWidth, this.container.offsetHeight);
    }

    animate(parameters) {
        if (config.scenes.world.automateParameters) {
            this.settings.bloomThreshold = parameters.bloomThreshold;
            this.settings.bloomStrength = parameters.bloomStrength;
            this.settings.bloomRadius = parameters.bloomRadius;
            this.settings.noiseAmp = parameters.noiseAmp;
            this.settings.noiseRadius = parameters.noiseRadius;
            this.settings.noiseFreq = parameters.noiseFreq;
            this.settings.noiseType = parameters.noiseType;
            this.settings.cameraDistance = parameters.cameraDistance;
            this.musicGenerator.setAudioParams(parameters.audioParam1, parameters.audioParam2);
        }
    }

    updateSettings() {
        this.bloomPass.threshold = this.settings.bloomThreshold;
        this.bloomPass.strength = this.settings.bloomStrength;
        this.bloomPass.radius = this.settings.bloomRadius;
        this.camera.position.setZ(this.settings.cameraDistance);
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
            config.scenes.world.camera.fieldOfView,
            window.innerWidth / window.innerHeight,
            config.scenes.world.camera.nearPlane,
            config.scenes.world.camera.farPlane
        );
        //this.camera.position.set(0, 0, 2.5);
        this.camera.lookAt(0, 0, 0);
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

    private addLoop() {
        this.loop = new Loop(this);
    }

    private addControls() {
        this.controls = new OrbitControls(this.camera, this.container);
        this.controls.enableDamping = true;
    }

    private addGUI() {
        this.gui = new dat.GUI({ autoPlace: true });
        this.gui.domElement.id = 'world-gui';
        let cameraFolder = this.gui.addFolder(`Camera`);
        cameraFolder.add(this.settings, "cameraDistance", 0, 10, 0.5);
        let colorsFolder = this.gui.addFolder(`Color Palette`);
        colorsFolder.addColor(this.settings, "primaryColor");
        colorsFolder.addColor(this.settings, "primaryVariant");
        colorsFolder.addColor(this.settings, "secondaryColor");
        colorsFolder.addColor(this.settings, "secondaryVariantColor");
        colorsFolder.addColor(this.settings, "backgroundColor").onChange((color) => {
            this.settings.backgroundColor = color;
            this.renderer.setClearColor(color);
        });
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

    private addLoaders() {
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/");
        this.gltf = new GLTFLoader();
        this.gltf.setDRACOLoader(this.dracoLoader);
    }

    private addObjects() {
        this.particles = new ParticleSystem(this);
        this.morphTargetGenerator = new MorphTargetGenerator(this);
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