import type World from "./World";

import * as THREE from 'three';
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import {MeshSurfaceSampler} from "three/examples/jsm/math/MeshSurfaceSampler";
import {config} from "../../config";

export default class MorphTargetGenerator {

    private world: World;
    private readonly verticesCount: number;
    private readonly generators: any[];

    private SVG = [
        {
            path: "/images/svg/card_1.svg",
            scaleFactor: 0.01
        },
        {
            path: "/images/svg/card_2.svg",
            scaleFactor: 0.007
        },
        {
            path: "/images/svg/card_3.svg",
            scaleFactor: 0.007
        },
        {
            path: "/images/svg/card_4.svg",
            scaleFactor: 0.007
        },
        {
            path: "/images/svg/card_5.svg",
            scaleFactor: 0.007
        },
        {
            path: "/images/svg/card_6.svg",
            scaleFactor: 0.007
        },
        {
            path: "/images/svg/card_7.svg",
            scaleFactor: 0.007
        },
        {
            path: "/images/svg/card_8.svg",
            scaleFactor: 0.007
        },
        {
            path: "/images/svg/card_9.svg",
            scaleFactor: 0.007
        },
        {
            path: "/images/svg/card_10.svg",
            scaleFactor: 0.007
        }
    ];
    private CANVAS_HEIGHT = config.morphTargetGenerator.canvasHeight;
    private CANVAS_WIDTH = config.morphTargetGenerator.canvasWidth;

    constructor(world: World) {
        this.world = world;
        this.verticesCount = this.world.particles.textureWidth * this.world.particles.textureHeight;
        this.generators = [this.perlinNoiseGenerator, this.loadRandomSVG, this.rorschachGenerator];
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
        let randomSVG = context.SVG[Math.floor(Math.random()*context.SVG.length)];
        let loader = new SVGLoader();
        loader.load(
            randomSVG.path,
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
                extrudeGeometry.scale(randomSVG.scaleFactor, -1*randomSVG.scaleFactor, randomSVG.scaleFactor);
                context.world.particles.updateMorphTarget({
                    "type": 0,
                    "positions": context.sampleGeometry(extrudeGeometry, false)
                });
            }
        );
    }

    private rorschachGenerator(context) {
        const points_count = 40;
        const t = 100; // time steps aka epochs
        let points = [];

        // random points coordinates
        for (let i = 0; i < points_count/2; i ++) {
            const a_x = - 0.0001;
            let a_y = 0;
            let v_x = Math.random();
            let v_y = Math.random() * 2 - 1;
            if (v_y >= 0) {
                a_y = -0.0001;
            } else {
                a_y = 0.0001;
            }
            // computes position at time t
            let x_x = v_x * t + 0.5 * a_x * Math.pow(t, 2);
            let x_y = v_y * t + 0.5 * a_y * Math.pow(t, 2);
            let point = new THREE.Vector2(x_x, x_y);
            points.push(point);
        }

        // sort points by angle
        points.sort(function(a, b) {
            let angle_a = Math.atan(a.x/a.y);
            let angle_b = Math.atan(b.x/b.y);
            if (angle_a == angle_b) {
                return 0;
            } else if (angle_a > angle_b) {
                return 1;
            } else {
                return -1;
            }
        });

        // compute curves points
        let curve = new THREE.SplineCurve(points);

        // extrude 3D geometry from 2D spline curve
        let scaleFactor = 0.02;
        let extrudeShape = new THREE.Shape(curve.getPoints(points_count*10));
        let extrudeGeometry = new THREE.ExtrudeGeometry(extrudeShape, {
            curveSegments: 20,
            steps: 2,
            depth: 5,
            bevelEnabled: false,
            bevelThickness: 0.2,
            bevelSize: 0.1,
            bevelOffset: 0,
            bevelSegments: 3
        }).center();
        extrudeGeometry.scale(scaleFactor, scaleFactor, scaleFactor);

        let vertices = context.sampleGeometry(extrudeGeometry, true);
        context.world.particles.updateMorphTarget({
            "type": 2,
            "positions": vertices
        });
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

    private sampleGeometry(geometry, applySymmetry) {
        let material = new THREE.MeshBasicMaterial();
        let mesh = new THREE.Mesh(geometry, material);
        const sampler = new MeshSurfaceSampler(mesh).build();
        const samples = [];
        const tempPosition = new THREE.Vector3();
        let samplesCount = applySymmetry ? this.verticesCount/2 : this.verticesCount;
        for (let i = 0; i < samplesCount; i++) {
            sampler.sample(tempPosition);
            samples.push(tempPosition.x, tempPosition.y, tempPosition.z, 1);
            if (applySymmetry) {
                samples.push(-tempPosition.x, tempPosition.y, tempPosition.z, 1);
            }
        }
        return samples;
    }

}