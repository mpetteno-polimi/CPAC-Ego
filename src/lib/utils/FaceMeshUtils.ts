import type {Keypoint} from "@tensorflow-models/face-landmarks-detection";
import * as THREE from 'three'
import {convertToRange, getScreenRangesForThreeJSWorld, getScreenRangesForWebcam} from "./CoordinatesUtils";


export function flattenFacialLandMarkArray(data: Keypoint[], currentSizes: Sizes): any[] {
    //let worldScreenRanges = getScreenRangesForThreeJSWorld(currentSizes.innerWidth, currentSizes.innerHeight);
    //let videoScreenRanges = getScreenRangesForWebcam(currentSizes.videoWidth, currentSizes.videoHeight);
    let array: number[] = [];
    data.forEach((el) => {
        const ar = currentSizes.videoHeight / currentSizes.videoWidth;
        const scale = 2 * Math.sqrt(currentSizes.videoWidth / 100);
        el.x = scale * (el.x / currentSizes.videoWidth - 0.5);
        el.y = scale * (-el.y / currentSizes.videoHeight + 0.6) * ar;
        el.z = scale * (-el.z / 700);
        array = [...array, ...Object.values(el)];
    })
    //console.log(array)
    return array.filter((el) => typeof el === 'number');
}

export function createBufferAttribute(data: number[]): THREE.BufferAttribute {
    const positionArray = new Float32Array(data);
    return new THREE.BufferAttribute(positionArray, 3);
}
