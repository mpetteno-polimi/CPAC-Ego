import type MorphTarget from "./MorphTarget";
import type Scene from "./Scene";
import {config} from "../../config";
import type {Face} from "@tensorflow-models/face-landmarks-detection";

import * as THREE from 'three'
import {TRIANGULATION} from "../utils/triangulation";
import {createBufferAttribute, getScreenRanges, mapRangetoRange} from "../utils/Utils";

export default class FacePointCloud {
    bufferGeometry: THREE.BufferGeometry;
    material: THREE.Material;
    cloud: THREE.Points<THREE.BufferGeometry, THREE.Material>;
    morphTarget: MorphTarget;
    scene: Scene;
    private readonly applyTriangulation: boolean;

    constructor(scene: Scene) {
        this.bufferGeometry = new THREE.BufferGeometry();
        this.material = scene.material;
        this.cloud = new THREE.Points(this.bufferGeometry, this.material);
        this.morphTarget = scene.morphTarget;
        this.scene = scene;
        this.applyTriangulation = config.threeJS.scene.triangulateFace;
    }

    updateFromFaceEstimation(estimatedFace: Face) {
        const flattenedFaceLandmarks = this.flattenFaceLandmarks(estimatedFace);
        const facePositions = createBufferAttribute(flattenedFaceLandmarks);
        this.updatePosition(facePositions);
    }

    updatePosition(attribute: THREE.BufferAttribute) {
        this.bufferGeometry.setAttribute("position", attribute);
        this.bufferGeometry.center();
        this.bufferGeometry.computeBoundingBox();
        this.bufferGeometry.computeBoundingSphere();
        this.bufferGeometry.computeVertexNormals();
        this.bufferGeometry.attributes.position.needsUpdate = true;
    }

    private flattenFaceLandmarks(estimatedFace: Face): number[] {
        let scaledKeypoints = this.scaleFaceKeypoints(estimatedFace.keypoints);
        let triangulatedKeypoints = this.triangulateFaceKeypoints(scaledKeypoints);
        return triangulatedKeypoints.flatMap((element) => Object.values(element));
    }

    private scaleFaceKeypoints(faceKeypoints: any[]) {
        let currentSizes = this.scene.currentSizes;
        const videoAspectRatio = currentSizes.videoWidth / currentSizes.videoHeight;
        const screenRange = getScreenRanges(videoAspectRatio, 8);
        //let estimatedFaceBox = estimatedFace.box;
        return faceKeypoints.map((keypoint) => {
            return {
                x: mapRangetoRange(currentSizes.videoHeight, keypoint.x, screenRange.height) - 1,
                //x: (keypoint.x - estimatedFaceBox.xMin - (estimatedFaceBox.width / 2)) / currentSizes.videoWidth;
                y: mapRangetoRange(currentSizes.videoHeight, keypoint.y, screenRange.height, true) + 1,
                //y: -(keypoint.y - estimatedFaceBox.yMin - (estimatedFaceBox.height / 2)) / currentSizes.videoHeight;
                z: keypoint.z = (keypoint.z / 100) * -1 + 0.5
            }
        });
    }

    private triangulateFaceKeypoints(faceKeypoints: any[]) {
        if (this.applyTriangulation) {
            let triangulatedKeypoints: any[] = [];
            for (let i = 0; i < TRIANGULATION.length / 3; i++) {
                let pointsToTriangulate = [TRIANGULATION[i * 3], TRIANGULATION[i * 3 + 1], TRIANGULATION[i * 3 + 2]].map((index) => {
                    let currentKeypoint = faceKeypoints[index];
                    return new THREE.Vector3(currentKeypoint.x, currentKeypoint.y, currentKeypoint.z);
                });
                let curve = new THREE.CatmullRomCurve3(pointsToTriangulate);
                let curvePoints = curve.getPoints( 50 ).map((vec3) => {
                    return { x: vec3.x,  y: vec3.y, z: vec3.z }
                });
                triangulatedKeypoints.push(curvePoints.flatMap((element) => Object.values(element)));
            }
            return triangulatedKeypoints
        } else {
            return faceKeypoints;
        }
    }
}