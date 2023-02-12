import type {BufferAttribute, InterleavedBufferAttribute} from "three";
import type World from "./World";

import {config} from "../../config";
import * as THREE from 'three';
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import {MeshSurfaceSampler} from "three/examples/jsm/math/MeshSurfaceSampler";

export default class MorphTarget {
    position: BufferAttribute | InterleavedBufferAttribute;
    private readonly pointsNumber: number;
    private world: World;

    constructor(world: World) {
        this.world = world;
        this.pointsNumber = 2*Math.pow(config.threeJS.scene.textureSize, 2);
        this.loadFromSvg({
            src: "./images/Inkblot.svg",
            scale: 0.01
        });
    }

    loadFromSvg(options: { src: string; scale: number; }) {
        let loader = new SVGLoader();
        loader.load(
            options.src, // called when the resource is loaded
        (svgData) => {
            let shapes = [];
            svgData.paths.forEach((path) => {
                shapes.push(...SVGLoader.createShapes(path));
            });
            let extrudeGeometry = new THREE.ExtrudeGeometry(shapes, {
                curveSegments: 20,
                steps: 2,
                depth: 5,
                bevelEnabled: false,
                bevelThickness: 0.2,
                bevelSize: 0.1,
                bevelOffset: 0,
                bevelSegments: 3
            }).center();
            extrudeGeometry.scale(options.scale, -1*options.scale, options.scale);
            let extrudedMaterial = new THREE.MeshBasicMaterial();
            let extrudedMesh = new THREE.Mesh(extrudeGeometry, extrudedMaterial);

            const sampler = new MeshSurfaceSampler(extrudedMesh).build();
            const vertices = [];
            const tempPosition = new THREE.Vector3();
            for (let i = 0; i < this.pointsNumber; i ++) {
                sampler.sample(tempPosition);
                vertices.push(tempPosition.x, tempPosition.y, tempPosition.z, 1);
            }

            this.world.particles.updateMorphTarget(vertices);
        });
    }

}