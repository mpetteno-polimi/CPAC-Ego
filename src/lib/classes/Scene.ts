import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import vertexShader from "../shaders/vertexShader.glsl";
import fragmentShader from "../shaders/fragmentShader.glsl";
import {config} from "../../config";
import PointCloud from "./PointCloud";

export default class Scene {
    private readonly scene: THREE.Scene;
    private currentSizes: Sizes;
    private container: HTMLElement;
    private videoInput: HTMLVideoElement;
    private renderer: THREE.WebGLRenderer;
    private readonly camera: THREE.PerspectiveCamera;
    private controls: OrbitControls;
    private time: number;
    private isPlaying: boolean;
    private material: THREE.ShaderMaterial;
    public pointClouds: PointCloud[];

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
        this.renderer.outputEncoding = THREE.sRGBEncoding;

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
        this.controls = new OrbitControls(this.camera, options.container);
        this.controls.enableDamping = true;

        this.time = 0;
        this.isPlaying = true;

        this.addObjects();
        this.resize();
        this.render();

    }

    resize() {
        this.currentSizes.width = this.container.offsetWidth;
        this.currentSizes.height = this.container.offsetHeight;
        this.renderer.setSize(this.currentSizes.width, this.currentSizes.height);
        this.camera.aspect = this.currentSizes.width / this.currentSizes.height;

        let videoAspect = this.currentSizes.videoHeight / this.currentSizes.videoWidth;
        let a1, a2;
        if (this.camera.aspect > videoAspect) {
            a1 = (this.currentSizes.width / this.currentSizes.height) * videoAspect;
            a2 = 1;
        } else {
            a1 = 1;
            a2 = (this.currentSizes.height / this.currentSizes.width) / videoAspect;
        }

        this.material.uniforms.u_resolution.value.x = this.currentSizes.width;
        this.material.uniforms.u_resolution.value.y = this.currentSizes.height;
        //this.material.uniforms.u_resolution.value.z = a1;
        //this.material.uniforms.u_resolution.value.w = a2;

        this.camera.updateProjectionMatrix();
    }

    addObjects() {
        // this.material = new THREE.PointsMaterial({
        //     color: 0xffffff,
        //     size: 0.01,
        //     sizeAttenuation: true,
        // })
        this.material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: "#extension GL_OES_standard_derivatives : enable"
            },
            side: THREE.DoubleSide,
            uniforms: {
                u_time: { type: "f", value: 0 },
                u_resolution: { type: "v2", value: new THREE.Vector2() },
                u_uvRate1: { value: new THREE.Vector2(1, 1) }
            },
            // wireframe = true;
            // transparent = true;
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })

        this.pointClouds = [...Array(config.faceMesh.detector.maxFaces)].map(() => new PointCloud(this.material));
        this.pointClouds.forEach((pointCloud) => {
            this.scene.add(pointCloud.cloud)
        })

        let axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper );
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
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

}