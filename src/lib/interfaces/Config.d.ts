import type {MediaPipeFaceMeshMediaPipeModelConfig} from "@tensorflow-models/face-landmarks-detection";
import type {MediaPipeFaceMeshEstimationConfig} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe/types";

type AppConfig = {
    faceMesh: FaceMeshConfig
    music: MusicConfig
    webcam: WebcamConfig
    threeJS: ThreeJSConfig
}

type FaceMeshConfig = {
    detector: MediaPipeFaceMeshMediaPipeModelConfig
    estimator: MediaPipeFaceMeshEstimationConfig
}

type MusicConfig = {
    generator: MusicGeneratorConfig
}

type MusicGeneratorConfig = {
    bassEnabled: true
}

type WebcamConfig = {
    widthRes: number,
    heightRes: number
    fps: number
}

type ThreeJSConfig = {
    camera: CameraConfig,
    scene: SceneConfig
}

type SceneConfig = {
    backgroundColor: number
    triangulateFace: boolean
    textureSize: number
}

type CameraConfig = {
    fieldOfView: number,
    nearPlane: number,
    farPlane: number
}