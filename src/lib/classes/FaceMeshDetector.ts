import type Webcam from "./Webcam";
import type ParticleSystem from "./ParticleSystem";
import type {Face} from "@tensorflow-models/face-landmarks-detection";

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
    private faceProcessor: Worker;

    constructor(webcam: Webcam, detectorConfig = config.faceMeshDetector.detector) {
        this.webcam = webcam;
        this.model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
        this.detector = null
        this.detectorConfig = detectorConfig;
        this.faceProcessor = new Worker(new URL('../workers/face-flattener.js', import.meta.url), {
            type: 'module'
        });
    }

    async loadDetector() {
        this.detector = await faceLandmarksDetection.createDetector(this.model, this.detectorConfig)
    }

    async detectFaces() {
        if (!this.detector)
            throw new Error('call the loadDetector method first on this class before calling this')
        return await this.detector.estimateFaces(this.webcam.video, config.faceMeshDetector.estimator)
    }

    processFaceDetection(particles: ParticleSystem, estimatedFace: Face, textureSize: number, onComplete: any) {
        this.faceProcessor.onmessage = (event) => { onComplete(particles, event) }
        this.faceProcessor.postMessage([
            estimatedFace,
            textureSize * 4,
            this.webcam.video.videoWidth,
            this.webcam.video.videoHeight,
            config.faceMeshDetector.triangulateFace,
            config.faceMeshDetector.faceScaleFactor
        ]);
    }
}