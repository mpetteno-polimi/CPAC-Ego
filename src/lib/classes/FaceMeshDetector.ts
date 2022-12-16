import '@mediapipe/face_mesh'
import '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import {config} from "../../config";


export default class FaceMeshDetector {
    detectorConfig: faceLandmarksDetection.MediaPipeFaceMeshMediaPipeModelConfig
    model: faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
    detector: faceLandmarksDetection.FaceLandmarksDetector | null

    constructor(detectorConfig = config.faceMesh.detector) {
        this.model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
        this.detector = null
        this.detectorConfig = detectorConfig;
    }

    async loadDetector() {
        this.detector = await faceLandmarksDetection.createDetector(this.model, this.detectorConfig)
    }

    async detect(source: faceLandmarksDetection.FaceLandmarksDetectorInput) {
        if (!this.detector)
            throw new Error('call the loadDetector method first on this class before calling this')
        return await this.detector.estimateFaces(source, config.faceMesh.estimator)
    }
}