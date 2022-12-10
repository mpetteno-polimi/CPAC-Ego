import type {MediaPipeFaceMeshMediaPipeModelConfig} from "@tensorflow-models/face-landmarks-detection";
import type {MediaPipeFaceMeshEstimationConfig} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe/types";

type AppConfig = {
    faceMesh: FaceMeshConfig
    webcam: WebcamConfig
    threeJS: ThreeJSConfig
}

type FaceMeshConfig = {
    detector: MediaPipeFaceMeshMediaPipeModelConfig
    estimator: MediaPipeFaceMeshEstimationConfig
}

type WebcamConfig = {
    canvasSize: number,
    widthRes: number,
    heightRes: number
}

type ThreeJSConfig = {
    camera: CameraConfig,
    scene: SceneConfig
}

type SceneConfig = {
    backgroundColor: number
}

type CameraConfig = {
    fieldOfView: number,
    nearPlane: number,
    farPlane: number
}