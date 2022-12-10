import type {Keypoint} from "@tensorflow-models/face-landmarks-detection";
import * as THREE from 'three'
import {getScreenRanges, mapRangetoRange} from "./CoordinatesUtils";
import {config} from "../../config";

const videoAspectRatio = config.webcam.widthRes / config.webcam.heightRes
const screenRange = getScreenRanges(videoAspectRatio, 4)
const canvasSize = config.webcam.canvasSize;

export function flattenFacialLandMarkArray(data: Keypoint[]): any[] {
    let array: number[] = []
    data.forEach((el) => {
        el.x = mapRangetoRange(canvasSize / videoAspectRatio, el.x, screenRange.height) - 1
        el.y = mapRangetoRange(canvasSize / videoAspectRatio, el.y, screenRange.height, true) + 1
        el.z = (el.z / 100) * -1 + 0.5
        array = [...array, ...Object.values(el)]
    })
    return array.filter((el) => typeof el === 'number')
}

export function createBufferAttribute(data: number[]): THREE.BufferAttribute {
    const positionArray = new Float32Array(data)
    return new THREE.BufferAttribute(positionArray, 3)
}
