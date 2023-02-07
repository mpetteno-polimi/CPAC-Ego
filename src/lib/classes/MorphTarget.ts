import {config} from "../../config";
import * as THREE from 'three';
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";

export default class MorphTarget {
    private geometry: THREE.BufferGeometry;
    private readonly material: THREE.LineBasicMaterial;
    private mesh: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
    private svgGroup: THREE.Group;

    constructor() {
        this.material = new THREE.LineBasicMaterial({color: "aqua"});
        this.loadFromCircleGeometry();
    }

    loadFromSvg(options: { src: string; scale: number; }) {
        let loader = new SVGLoader();
        loader.load(
            options.src, // called when the resource is loaded
        (svgData) => {
            this.svgGroup = new THREE.Group();
            this.svgGroup.scale.multiplyScalar( options.scale );
            this.svgGroup.scale.y *= - 1;
            svgData.paths.forEach((path) => {
                const shapes = SVGLoader.createShapes( path );
                shapes.forEach((shape) => {
                    const meshGeometry = new THREE.ExtrudeGeometry(shape, {
                        steps: 2,
                        depth: 2,
                        bevelEnabled: false
                    });
                    meshGeometry.center();
                    //const mesh = new THREE.Mesh(meshGeometry, fillMaterial);
                    const linesGeometry = new THREE.EdgesGeometry(meshGeometry);
                    const lines = new THREE.LineSegments(linesGeometry, this.material);
                    this.svgGroup.add(lines);
                });
            });
        });
    }

    // TODO - Remove (only for test)
    loadFromCircleGeometry() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            new THREE.Path().absarc(
                0,
                0,
                1.25,
                0,
                Math.PI * 2,
                true
            ).getSpacedPoints(config.threeJS.scene.particles )
        );
        this.mesh = new THREE.Line(this.geometry, this.material);
    }

    getMorphBufferAttribute() {
        return this.geometry.getAttribute("position").clone();
    }

}