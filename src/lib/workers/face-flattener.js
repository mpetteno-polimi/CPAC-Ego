import * as THREE from "three";
import {TRIANGULATION} from "../utils/triangulation.js";
import {getScreenRanges, mapRangetoRange} from "../utils/utils.js";

class FaceFlattener {

    constructor(estimatedFace, targetArraySize, currentSizes, triangulateFace) {
        this.estimatedFace = estimatedFace;
        this.targetArraySize = targetArraySize;
        this.currentSizes = currentSizes;
        this.triangulateFace = triangulateFace;
    }

    getFaceTextureData() {
        let flattenFaceLandmarks = this.flattenFaceLandmarks(this.estimatedFace);
        let facBufferGeometry = new THREE.BufferGeometry().setFromPoints(flattenFaceLandmarks).center();
        let facePoints = facBufferGeometry.getAttribute("position").array;
        let positionData = [], velocityData = [], currentLandmarkIndex = 0;
        for (let i = 0; i < this.targetArraySize; i += 4) {
            positionData.push(facePoints[currentLandmarkIndex], facePoints[currentLandmarkIndex+1], facePoints[currentLandmarkIndex+2], 1);
            velocityData.push(0, 0, 0, 1);
            currentLandmarkIndex = currentLandmarkIndex+3;
        }
        return [positionData, velocityData];
    }

    flattenFaceLandmarks(estimatedFace) {
        let scaledKeypoints = this.scaleFaceKeypoints(estimatedFace.keypoints);
        return this.triangulateFaceKeypoints(scaledKeypoints).flatMap((element) => element);
    }

    scaleFaceKeypoints(faceKeypoints) {
        let currentSizes = this.currentSizes;
        const videoAspectRatio = currentSizes.videoWidth / currentSizes.videoHeight;
        const screenRange = getScreenRanges(videoAspectRatio, 8);
        //let estimatedFaceBox = estimatedFace.box;
        return faceKeypoints.map((keypoint) => {
            return {
                x: mapRangetoRange(currentSizes.videoHeight, keypoint.x, screenRange.height) - 1,
                //x: (keypoint.x - estimatedFaceBox.xMin - (estimatedFaceBox.width / 2)) / currentSizes.videoWidth;
                y: mapRangetoRange(currentSizes.videoHeight, keypoint.y, screenRange.height, true) + 1,
                //y: -(keypoint.y - estimatedFaceBox.yMin - (estimatedFaceBox.height / 2)) / currentSizes.videoHeight;
                z: keypoint.z = (keypoint.z / 100) * -1 + 0.5,
                name: keypoint.name
            }
        });
    }

    triangulateFaceKeypoints(faceKeypoints) {
        if (this.triangulateFace) {
            const EYES_TRIANGULATIONS = 42;
            let triangulatedKeypoints = [], totalPoints = this.targetArraySize/4;
            for (let i = 0; i < TRIANGULATION.length / 3; i++) {
                let currentIndex = i*3;
                let pointsToTriangulate = [
                    TRIANGULATION[currentIndex],
                    TRIANGULATION[currentIndex + 1],
                    TRIANGULATION[currentIndex + 2]
                ].map((index) => { return faceKeypoints[index]; });
                let eyeTriangulationPoints = pointsToTriangulate.filter((point) => point.name && point.name.includes('Eye'));
                if (eyeTriangulationPoints.length < 3) {
                    let curve = new THREE.CatmullRomCurve3(pointsToTriangulate.map((currentKeypoint) => {
                        return new THREE.Vector3(currentKeypoint.x, currentKeypoint.y, currentKeypoint.z);
                    }));
                    let pointsPerCurve = Math.ceil(totalPoints / (TRIANGULATION.length / 3 - EYES_TRIANGULATIONS));
                    let curvePoints = curve.getPoints(pointsPerCurve).map((vec3) => {
                        return { x: vec3.x,  y: vec3.y, z: vec3.z }
                    });
                    triangulatedKeypoints.push(curvePoints);
                }
            }
            return triangulatedKeypoints;
        } else {
            return faceKeypoints.map((keypoint) => { return { x: keypoint.x, y: keypoint.y, z: keypoint.z } });
        }
    }

}

onmessage = (event) => {
    let estimatedFace = event.data[0];
    let targetArraySize = event.data[1];
    let currentSizes = event.data[2];
    let triangulateFace = event.data[3];
    let faceFlattener = new FaceFlattener(estimatedFace, targetArraySize, currentSizes, triangulateFace);
    postMessage([faceFlattener.getFaceTextureData()]);
}