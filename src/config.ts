import type {AppConfig} from "./lib/interfaces/Config";

export const config: AppConfig = {
    faceMesh: {
        detector: {
            runtime: 'mediapipe',
            refineLandmarks: true,
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
            maxFaces: 1
        },
        estimator: {
            flipHorizontal: false,
            staticImageMode: false
        }
    },
    webcam: {
        canvasSize: 500,
        widthRes: 1280,
        heightRes: 720
    },
    threeJS: {
        camera: {
            fieldOfView: 75,
            nearPlane: 0.01,
            farPlane: 100
        },
        scene: {
            backgroundColor: 0x000000
        }
    }
}
