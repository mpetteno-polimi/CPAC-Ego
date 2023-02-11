import type {BufferAttribute, InterleavedBufferAttribute} from "three";

import {config} from "../../config";
import * as THREE from 'three';
import World from "./World";
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import {mergeBufferGeometries} from "three/examples/jsm/utils/BufferGeometryUtils";

export default class MorphTarget {
    position: BufferAttribute | InterleavedBufferAttribute;
    private pointsNumber: number;
    private world: World;

    constructor(world: World) {
        this.world = world;
        this.pointsNumber = config.threeJS.scene.textureSize * config.threeJS.scene.textureSize * 2;
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
            let geometries = [];
            svgData.paths.forEach((path) => {
                const shapes = SVGLoader.createShapes(path);
                shapes.forEach((shape) => {
                    let extrudeGeometry = new THREE.ExtrudeGeometry(shape, {
                        curveSegments: 20,
                        steps: 2,
                        depth: 5,
                        bevelEnabled: false,
                        bevelThickness: 0.2,
                        bevelSize: 0.1,
                        bevelOffset: 0,
                        bevelSegments: 3
                    }).center();
                    geometries.push(extrudeGeometry);
                });
            });
            let svgGeom = mergeBufferGeometries(geometries);
            svgGeom.scale(options.scale, -1*options.scale, options.scale);
            this.position = svgGeom.getAttribute("position");
            this.world.particles.updateMorphTarget(this.position);
        });
    }

}