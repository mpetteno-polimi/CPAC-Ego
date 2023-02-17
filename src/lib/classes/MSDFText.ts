import { MSDFTextGeometry, MSDFTextMaterial, uniforms } from "three-msdf-text-utils";
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import * as THREE from "three";
import type SplashScreen from "./SplashScreen";
import vertexShader from "../shaders/text/vertexShader.glsl";
import fragmentShader from "../shaders/text/fragmentShader.glsl";

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
        })
    }

    protected addGeometry() {
        this.geometry = new MSDFTextGeometry({
            text: "ego",
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
                ...uniforms.strokes
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
            this.textureLoader.load("/fonts/msdf/roboto-regular.png", resolve);
        });
    }

    private loadFont() {
        return new Promise((resolve, reject) => {
            this.fontLoader.load("/fonts/msdf/roboto-regular.fnt", resolve);
        });
    }


}