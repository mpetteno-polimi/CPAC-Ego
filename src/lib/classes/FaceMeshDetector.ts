import type Webcam from "./Webcam";

import '@mediapipe/face_mesh'
import '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import {config} from "../../config";


export default class FaceMeshDetector {
    private readonly detectorConfig: faceLandmarksDetection.MediaPipeFaceMeshMediaPipeModelConfig
    private readonly model: faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
    private detector: faceLandmarksDetection.FaceLandmarksDetector | null
    private webcam: Webcam;

    constructor(webcam: Webcam, detectorConfig = config.faceMesh.detector) {
        this.webcam = webcam;
        this.model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
        this.detector = null
        this.detectorConfig = detectorConfig;
    }

    async loadDetector() {
        this.detector = await faceLandmarksDetection.createDetector(this.model, this.detectorConfig)
    }

    async detectFaces() {
        if (!this.detector)
            throw new Error('call the loadDetector method first on this class before calling this')
        return await this.detector.estimateFaces(this.webcam.video, config.faceMesh.estimator)
    }
}