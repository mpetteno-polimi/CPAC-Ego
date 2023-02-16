import type World from "./World";

import * as THREE from 'three';
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import {MeshSurfaceSampler} from "three/examples/jsm/math/MeshSurfaceSampler";
import {config} from "../../config";

export default class MorphTargetGenerator {

    private world: World;
    private readonly verticesCount: number;
    private readonly generators: any[];

    private SVG_PATHS = ["/images/Inkblot.svg"];
    private CANVAS_HEIGHT = config.morphTargetGenerator.canvasHeight;
    private CANVAS_WIDTH = config.morphTargetGenerator.canvasWidth;

    constructor(world: World) {
        this.world = world;
        this.verticesCount = this.world.particles.textureWidth * this.world.particles.textureHeight;
        this.generators = [this.perlinNoiseGenerator, this.loadRandomSVG];
    }

    getRandomMorphTarget() {
        let randomGeneratorIndex = Math.floor(Math.random()*this.generators.length);
        this.generators[randomGeneratorIndex](this);
    }

    private perlinNoiseGenerator(context) {
        context.world.particles.updateMorphTarget({
            "type": 1,
            "positions": context.getCanvasPositions(context),
            "canvasWidth": context.CANVAS_WIDTH,
            "canvasHeight": context.CANVAS_HEIGHT,
            "noiseSeed": Math.random()*context.world.particles.textureHeight
        });
    }

    private loadRandomSVG(context) {
        let scaleFactor = 0.01;
        let randomSVGPath = context.SVG_PATHS[Math.floor(Math.random()*context.SVG_PATHS.length)]
        let loader = new SVGLoader();
        loader.load(
            randomSVGPath,
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
                extrudeGeometry.scale(scaleFactor, -1*scaleFactor, scaleFactor);
                context.world.particles.updateMorphTarget({
                    "type": 0,
                    "positions": context.sampleGeometry(extrudeGeometry)
                });
            }
        );
    }

    private getCanvasPositions(context) {
        let boxPosition = [];
        for (let i = 0; i < context.world.particles.textureWidth; i++) {
            for (let j = 0; j < context.world.particles.textureHeight; j++) {
                let pX = i / context.world.particles.textureWidth * context.CANVAS_WIDTH - context.CANVAS_WIDTH / 2;
                let pY = j / context.world.particles.textureHeight * context.CANVAS_HEIGHT - context.CANVAS_HEIGHT / 2;
                let pZ = 0;
                boxPosition.push(pX, pY, pZ, 1.);
            }
        }
        return boxPosition;
    }

    private sampleGeometry(geometry) {
        let material = new THREE.MeshBasicMaterial();
        let mesh = new THREE.Mesh(geometry, material);
        const sampler = new MeshSurfaceSampler(mesh).build();
        const samples = [];
        const tempPosition = new THREE.Vector3();
        for (let i = 0; i < this.verticesCount; i++) {
            sampler.sample(tempPosition);
            samples.push(tempPosition.x, tempPosition.y, tempPosition.z, 1);
        }
        return samples;
    }

}