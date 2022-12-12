import type {AppConfig} from "./lib/interfaces/Config";

export const config: AppConfig = {
    faceMesh: {
        detector: {
            runtime: 'mediapipe',
            refineLandmarks: true,
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
            maxFaces: 2
        },
        estimator: {
            flipHorizontal: false,
            staticImageMode: false
        }
    },
    webcam: {
        widthRes: 1280,
        heightRes: 720,
        fps: 60
    },
    threeJS: {
        camera: {
            fieldOfView: 90,
            nearPlane: 0.01,
            farPlane: 1000
        },
        scene: {
            backgroundColor: 0x000000
        }
    }
}
