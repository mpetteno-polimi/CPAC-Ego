import { MSDFTextGeometry, MSDFTextMaterial, uniforms } from "three-msdf-text-utils";
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import * as THREE from "three";
import type SplashScreen from "./SplashScreen";
import vertexShader from "../shaders/text/vertexShader.glsl";
import fragmentShader from "../shaders/text/fragmentShader.glsl";
import {config} from "../../config";

export default class MSDFText {

    mesh: THREE.Mesh<MSDFTextGeometry, MSDFTextMaterial>;
    private splashScreen: SplashScreen;
    private textureLoader: THREE.TextureLoader;
    private fontLoader: FontLoader;
    private geometry: MSDFTextGeometry;
    private material: MSDFTextMaterial;
    private fontAtlas: THREE.Texture;
    private font: Font;

    constructor(splashScreen: SplashScreen, visible: boolean = true) {
        this.splashScreen = splashScreen;
        this.addLoaders();
        Promise.all([
            this.loadFontAtlas(), this.loadFont()
        ]).then(([atlas, font]) => {
            this.fontAtlas = atlas;
            this.font = font;
            this.addGeometry();
            this.addMaterial();
            this.addMesh();
            this.splashScreen.scene.add(this.mesh);
            this.splashScreen.start();
        })
    }

    updateUniforms(options) {
        this.material.uniforms.uProgress1.value = options.uProgress1;
        this.material.uniforms.uProgress2.value = options.uProgress2;
        this.material.uniforms.uProgress3.value = options.uProgress3;
        this.material.uniforms.uProgress4.value = options.uProgress4;
        this.material.uniforms.uTime.value = options.uTime;
        this.material.uniforms.uPrimaryColor.value = new THREE.Color(options.uPrimaryColor);
        this.material.uniforms.uPrimaryVariant.value = new THREE.Color(options.uPrimaryVariant);
        this.material.uniforms.uSecondaryColor.value = new THREE.Color(options.uSecondaryColor);
        this.material.uniforms.uSecondaryVariantColor.value = new THREE.Color(options.uSecondaryVariantColor);
        this.material.uniforms.uBackgroundColor.value = new THREE.Color(options.uBackgroundColor);
    }

    protected addGeometry() {
        this.geometry = new MSDFTextGeometry({
            text: config.scenes.splashScreen.title,
            font: this.font.data,
            align: 'center'
        });
    }

    protected addMaterial() {
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            defines: {
                IS_SMALL: false,
            },
            extensions: {
                derivatives: true,
            },
            uniforms: {
                // Common
                ...uniforms.common,
                // Rendering
                ...uniforms.rendering,
                // Strokes
                ...uniforms.strokes,
                ...{
                    uProgress1: { value: 0 },
                    uProgress2: { value: 0 },
                    uProgress3: { value: 0 },
                    uProgress4: { value: 0 },
                    uTime: { value: 0 },
                    uPrimaryColor: { value: new THREE.Color() },
                    uPrimaryVariant: { value: new THREE.Color() },
                    uSecondaryColor: { value: new THREE.Color() },
                    uSecondaryVariantColor: { value: new THREE.Color() },
                    uBackgroundColor: { value: new THREE.Color() }
                }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });
        this.material.uniforms.uMap.value = this.fontAtlas;
    }

    protected addMesh() {
        this.mesh =  new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = Math.PI;
        const scale = 1;
        this.mesh.position.x = -this.geometry.layout.width / 2 * scale;
        this.mesh.scale.set(scale, scale, scale);
    }

    protected addLoaders() {
        this.textureLoader = new THREE.TextureLoader();
        this.fontLoader = new FontLoader();
    }

    private loadFontAtlas() {
        return new Promise((resolve, reject) => {
            this.textureLoader.load('/CPAC-Ego' + config.scenes.splashScreen.font.atlas, resolve);
        });
    }

    private loadFont() {
        return new Promise((resolve, reject) => {
            this.fontLoader.load('/CPAC-Ego' + config.scenes.splashScreen.font.fnt, resolve);
        });
    }


}