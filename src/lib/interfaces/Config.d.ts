import type {MediaPipeFaceMeshMediaPipeModelConfig} from "@tensorflow-models/face-landmarks-detection";
import type {MediaPipeFaceMeshEstimationConfig} from "@tensorflow-models/face-landmarks-detection/dist/mediapipe/types";

type AppConfig = {
    scenes: ScenesConfig,
    faceMeshDetector: FaceMeshDetectorConfig,
    faceExpressionDetector: FaceExpressionDetectorConfig,
    morphTargetGenerator: MorphTargetGeneratorConfig,
    music: MusicConfig,
    webcam: WebcamConfig,
    loop: LoopConfig,
    osc: OSCConfig
}

type ScenesConfig = {
    splashScreen: SplashScreenConfig,
    world: WorldConfig
}

type SplashScreenConfig = {
    title: string,
    subtitle: string,
    font: FontConfig,
    transition: TransitionConfig,
    camera: CameraConfig,
    backgroundColor: number
}

type WorldConfig = {
    transition: TransitionConfig,
    camera: CameraConfig
    backgroundColor: number,
    particlesCount: number,
    automateParameters: boolean
}

type FaceMeshDetectorConfig = {
    detector: MediaPipeFaceMeshMediaPipeModelConfig
    estimator: MediaPipeFaceMeshEstimationConfig
    faceScaleFactor: number,
    triangulateFace: boolean
}

type FaceExpressionDetectorConfig = {

}

type MorphTargetGeneratorConfig = {
    svg: SVGMorphTargetGeneratorConfig,
    perlin: PerlinNoiseMorphTargetGeneratorConfig,
    symmetric: SymmetryMorphTargetGeneratorConfig
}

type SVGMorphTargetGeneratorConfig = {
    paths: any[]
}

type PerlinNoiseMorphTargetGeneratorConfig = {
    canvasWidth: number,
    canvasHeight: number
}

type SymmetryMorphTargetGeneratorConfig = {
    time: number,
    pointsCount: number
}

type MusicConfig = {
    player: MusicPlayerConfig,
    generator: MusicGeneratorConfig,
    toneJS: ToneJSConfig
}

type MusicPlayerConfig = {

}

type ToneJSConfig = {

}

type MusicGeneratorConfig = {
    bassEnabled: true
}

type WebcamConfig = {
    widthRes: number,
    heightRes: number,
    fps: number
}

type LoopConfig = {
    faceDetectionStartTime: number,
    faceDetectedMorphDuration: number,
    morphStart: number,
    morphDuration: number,
    morphEnd: number,
}

type OSCConfig = {
    host: string,
    port: number
}

type CameraConfig = {
    fieldOfView: number,
    nearPlane: number,
    farPlane: number
}

type TransitionConfig = {
    in: {
        delay: number,
        duration: number
    },
    out: {
        delay: number,
        duration: number
    }
}

type FontConfig = {
    fnt: string,
    atlas: string
}