import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import vertexShader from "../shaders/particles/vertexShader.glsl";
import fragmentShader from "../shaders/particles/fragmentShader.glsl";
import {config} from "../../config";
import FacePointCloud from "./FacePointCloud";
import * as dat from "dat.gui";

export default class Scene {
    private readonly scene: THREE.Scene;
    private currentSizes: Sizes;
    private container: HTMLElement;
    private videoInput: HTMLVideoElement;
    private readonly renderer: THREE.WebGLRenderer;
    private readonly camera: THREE.PerspectiveCamera;
    private controls: OrbitControls;
    private time: number;
    private isPlaying: boolean;
    private material: THREE.ShaderMaterial;
    public facePointClouds: FacePointCloud[];
    private readonly dracoLoader: DRACOLoader;
    private gltf: GLTFLoader;
    private gui: dat.GUI;
    private renderScene: RenderPass;
    private bloomPass: any;
    private composer: EffectComposer;
    private settings: { bloomStrength: number; distortion: number };

    constructor(options) {
        this.scene = new THREE.Scene();

        this.container = options.container
        this.videoInput = options.video
        this.currentSizes = {
            width: this.container.offsetWidth,
            height: this.container.offsetHeight,
            videoWidth: this.videoInput.width,
            videoHeight: this.videoInput.height
        };

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(config.threeJS.scene.backgroundColor);
        this.renderer.physicallyCorrectLights = true;
        //this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.container.append(this.renderer.domElement);

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
        this.camera.position.set(0, 0, 2);
        this.camera.lookAt(0, 0, 0);
        this.controls = new OrbitControls(this.camera, options.container);
        this.controls.enableDamping = true;

        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/");
        this.gltf = new GLTFLoader();
        this.gltf.setDRACOLoader(this.dracoLoader);

        this.time = 0;
        this.isPlaying = true;

        this.settingsControls();
        this.addObjects();
        this.addPostProcessing();
        this.resize();
        this.render();
    }

    settingsControls() {
        this.settings = {
            distortion: 0,
            bloomStrength: 0
        };
        this.gui = new dat.GUI();
        this.gui.add(this.settings, "distortion", 0, 3, 0.01);
        this.gui.add(this.settings, "bloomStrength", 0, 10, 0.01);
    }

    resize() {
        this.currentSizes.width = this.container.offsetWidth;
        this.currentSizes.height = this.container.offsetHeight;
        this.renderer.setSize(this.currentSizes.width, this.currentSizes.height);
        this.composer.setSize(this.currentSizes.width, this.currentSizes.height);
        this.camera.aspect = this.currentSizes.width / this.currentSizes.height;
        this.material.uniforms.u_resolution.value.x = this.currentSizes.width;
        this.material.uniforms.u_resolution.value.y = this.currentSizes.height;
        this.camera.updateProjectionMatrix();
    }

    addObjects() {
        // this.material = new THREE.MeshStandardMaterial( {
        //     color: 0xff0000,
        //     wireframe: true
        // } );

        this.material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: "#extension GL_OES_standard_derivatives : enable"
            },
            side: THREE.DoubleSide,
            uniforms: {
                u_time: { type: "f", value: 0 },
                u_distortion: { type: "f", value: 0},
                u_resolution: { type: "v2", value: new THREE.Vector2() },
                u_uvRate: { value: new THREE.Vector2(1, 1) }
            },
            // wireframe: true,
            // transparent: true,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })

        this.facePointClouds = [...Array(config.faceMesh.detector.maxFaces)].map(() => new FacePointCloud(this.material));
        this.facePointClouds.forEach((pointCloud) => {
            this.scene.add(pointCloud.cloud)
        })

        // let axesHelper = new THREE.AxesHelper( 5 );
        // this.scene.add( axesHelper );
        //
        // let gridHelper = new THREE.GridHelper(10, 10);
        // this.scene.add(gridHelper);

        // let loader = new SVGLoader();
        // loader.load(
        //     "/images/Inkblot.svg", // called when the resource is loaded
        // (svgData) => {
        //     const svgGroup = new THREE.Group();
        //     svgGroup.scale.multiplyScalar( 0.005 );
        //     svgGroup.scale.y *= - 1;
        //     //const fillMaterial = new THREE.MeshBasicMaterial({ color: "#F3FBFB" });
        //     const stokeMaterial = new THREE.LineBasicMaterial({ color: "#00A5E6" });
        //     svgData.paths.forEach((path) => {
        //         const shapes = SVGLoader.createShapes( path );
        //         shapes.forEach((shape) => {
        //             const meshGeometry = new THREE.ExtrudeGeometry(shape, {
        //                 steps: 2,
        //                 depth: 2,
        //                 bevelEnabled: false
        //             });
        //             meshGeometry.center();
        //             //const mesh = new THREE.Mesh(meshGeometry, fillMaterial);
        //             const linesGeometry = new THREE.EdgesGeometry(meshGeometry);
        //             const lines = new THREE.LineSegments(linesGeometry, stokeMaterial);
        //             svgGroup.add(lines);
        //         });
        //     });
        //     this.scene.add(svgGroup);
        // });
    }

    addPostProcessing() {
        this.renderScene = new RenderPass(this.scene, this.camera);
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        this.bloomPass.threshold = this.settings.bloomThreshold;
        this.bloomPass.strength = this.settings.bloomStrength;
        this.bloomPass.radius = this.settings.bloomRadius;
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(this.renderScene);
        this.composer.addPass(this.bloomPass);
    }

    addLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0.5, 0, 0.866); // about 60°
        this.scene.add(directionalLight);
    }

    play() {
        if (!this.isPlaying) {
            this.render();
            this.isPlaying = true;
        }
    }

    stop() {
        this.isPlaying = false;
    }

    render() {
        if (!this.isPlaying) return;
        this.time += 0.5;
        this.material.uniforms.u_time.value = this.time;
        this.material.uniforms.u_distortion.value = this.settings.distortion;
        this.bloomPass.strength = this.settings.bloomStrength;
        this.controls.update();
        //this.renderer.render(this.scene, this.camera);
        this.composer.render();
    }

}