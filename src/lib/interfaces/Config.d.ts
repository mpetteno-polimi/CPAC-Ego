import type {MediaPipeFaceMeshMediaPipeModelConfig} from "@tensorflow-models/face-landmarks-detection";
import type {MediaPipeFaceMeshEstimationConfig} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe/types";

type AppConfig = {
    faceMesh: FaceMeshConfig
    morphTargetGenerator: MorphTargetGeneratorConfig
    music: MusicConfig
    webcam: WebcamConfig
    threeJS: ThreeJSConfig
}

type FaceMeshConfig = {
    detector: MediaPipeFaceMeshMediaPipeModelConfig
    estimator: MediaPipeFaceMeshEstimationConfig
}

type MorphTargetGeneratorConfig = {
    canvasWidth: number,
    canvasHeight: number
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
    scene: SceneConfig,
    loop: LoopConfig
}

type SceneConfig = {
    backgroundColor: number
    faceScaleFactor: number,
    triangulateFace: boolean
    particlesCount: number
    automateParameters: boolean
}

type CameraConfig = {
    fieldOfView: number,
    nearPlane: number,
    farPlane: number
}

type LoopConfig = {
    faceDetectionStartTime: number,
    faceDetectedMorphDuration: number,
    morphStart: number,
    morphDuration: number,
    morphEnd: number,

}