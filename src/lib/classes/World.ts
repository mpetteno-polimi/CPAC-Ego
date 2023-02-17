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
    currentSizes: Sizes;
    private readonly container: HTMLElement;
    private videoInput: HTMLVideoElement;
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
        distortion: number,
        zoom: number,
        noiseFreq: number,
        noiseAmp: number,
        noiseRadius: number,
        noiseSpeed: number
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
        this.settings = {
            distortion: 0,
            bloomRadius: 0,
            bloomThreshold: 0,
            bloomStrength: 0,
            zoom: 1,
            noiseFreq: 15,
            noiseAmp: 0.3,
            noiseRadius: 1,
            noiseSpeed: 3
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
        this.musicGenerator.musicPlayer.startNoiseDrone();
    }

    start() {
        this.loop.start();
        this.musicGenerator.newFace();
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

    updateSettings(isFaceDetected, isMorphEnabled) {
        if(config.threeJS.scene.automateParameters){
            let mod1 = this.LFO('sin', 0.07, 0, 1)
            let mod2 = this.LFO('sin', 0.23, 0, 1)
            this.bloomPass.strength = this.LFO('sin', 0.13, 0.2, 0.2+mod2);
            this.bloomPass.radius = 0.1+mod1;
            this.settings.noiseAmp = 0.45+mod1*0.3;
            this.settings.noiseRadius = 1+mod2;
            this.settings.noiseFreq = 5+15*mod2;
            this.camera.position.set(0, 0, this.LFO('sin', 0.1, 2.5, 3));
    
            if(!isFaceDetected && !isMorphEnabled){
            }else if(isFaceDetected && isMorphEnabled){
                this.settings.noiseAmp += mod2*0.3;
                this.bloomPass.strength += mod2*0.2;
                this.bloomPass.radius += mod1*0.5;
                this.settings.noiseSpeed = 0.001+mod1*0.005+mod1*mod2*0.1;
            }else if(isFaceDetected && !isMorphEnabled){
            }
            let audioParam1 = this.clampAndNormalize(this.bloomPass.strength, 0.2, 1.4);
            let audioParam2 = this.clampAndNormalize(this.settings.noiseAmp, 0.45, 1.05);
            this.musicGenerator.setAudioParams(audioParam1, audioParam2);
            return;
        }
        this.bloomPass.threshold = this.settings.bloomThreshold;
        this.bloomPass.strength = this.settings.bloomStrength;
        this.bloomPass.radius = this.settings.bloomRadius;
        this.camera.zoom = this.settings.zoom;
    }

    clampAndNormalize(input, min, max){
        let val = Math.min(Math.max(input, min), max);
        val = (val - min)/(max-min);
        return val;
    }

    private LFO(type, freq, min, max){
        let millis = Date.now()/1000.0;
        switch(type){
            case 'sin':
                return min + (0.5+Math.sin(freq*millis)/2)*(max-min);
        }
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
        //this.camera.position.set(0, 0, 2.5);
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
    }

    private addGUI() {
        this.gui = new dat.GUI();
        this.gui.add(this.settings, "distortion", 0, 3, 0.01);
        this.gui.add(this.settings, "bloomThreshold", 0, 10, 0.01);
        this.gui.add(this.settings, "bloomStrength", 0, 10, 0.01);
        this.gui.add(this.settings, "bloomRadius", 0, 10, 0.01);
        this.gui.add(this.settings, "zoom", 0, 10, 0.5);
        this.gui.add(this.settings, "noiseAmp", 0, 2, 0.01);
        this.gui.add(this.settings, "noiseFreq", 0, 100, 0.01);
        this.gui.add(this.settings, "noiseRadius", 0, 20, 0.01);
        this.gui.add(this.settings, "noiseSpeed", 0, 20, 0.01);
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