import type {Keypoint} from "@tensorflow-models/face-landmarks-detection";
import type {BufferGeometry} from "three";

import * as THREE from 'three';
import * as BufferGeometryUtils  from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { LoopSubdivision } from './LoopSubdivision.js';

export function flattenFacialLandMarkArray(data: Keypoint[], currentSizes: Sizes): any[] {
    const videoAspectRatio = currentSizes.videoWidth / currentSizes.videoHeight;
    const screenRange = getScreenRanges(videoAspectRatio, 8);
    let array: number[] = [];
    data.forEach((el) => {
        el.x = mapRangetoRange(currentSizes.videoHeight, el.x, screenRange.height) - 1;
        el.y = mapRangetoRange(currentSizes.videoHeight, el.y, screenRange.height, true) + 1;
        el.z = (el.z / 100) * -1 + 0.5;
        array = [...array, ...Object.values(el)];
    })
    return array.filter((el) => typeof el === 'number');
}

export function createBufferAttribute(data: number[]): THREE.BufferAttribute {
    const positionArray = new Float32Array(data);
    return new THREE.BufferAttribute(positionArray, 3);
}

export function subdivideGeometry(bufferGeometry: BufferGeometry) {
    const iterations = 5;
    const params = {
        split:          false,
        uvSmooth:       false,
        preserveEdges:  true,
        flatOnly:       true,
        maxTriangles:   5000,
    };
    const modifiedGeometry = LoopSubdivision.modify(bufferGeometry, iterations, params);
    BufferGeometryUtils.mergeVertices(modifiedGeometry);
    modifiedGeometry.computeVertexNormals();
    modifiedGeometry.center();
    return modifiedGeometry;
}

export function getScreenRanges(aspectRatio: number, width: number): ScreenRange {
    const screenHeight: number = width / aspectRatio;
    const widthStart: number = 0 - width / 2;
    const widthEnd: number = widthStart + width;
    const heightStart: number = 0 - screenHeight / 2;
    const heightEnd: number = heightStart + screenHeight;
    return {
        height: { from: heightStart, to: heightEnd },
        width: { from: widthStart, to: widthEnd }
    };
}

export function mapRangetoRange(from: number, point: number, range: Range, invert = false): number {
    let pointMagnitude = point / from;
    if (invert) pointMagnitude = 1 - pointMagnitude;
    const targetMagnitude = range.to - range.from;
    return targetMagnitude * pointMagnitude + range.from;
}