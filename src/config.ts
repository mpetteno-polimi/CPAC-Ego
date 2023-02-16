import type {AppConfig} from "./lib/interfaces/Config";

export const config: AppConfig = {
    faceMesh: {
        detector: {
            runtime: 'mediapipe',
            refineLandmarks: false,
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
            maxFaces: 1
        },
        estimator: {
            flipHorizontal: false,
            staticImageMode: false
        }
    },
    morphTargetGenerator: {
        canvasWidth: 4,
        canvasHeight: 4
    },
    music: {
        generator: {
            bassEnabled: true
        }
    },
    webcam: {
        widthRes: 1280,
        heightRes: 720,
        fps: 60
    },
    threeJS: {
        camera: {
            fieldOfView: 75,
            nearPlane: 0.01,
            farPlane: 100
        },
        scene: {
            backgroundColor: 0x000000,
            faceScaleFactor: 1,
            triangulateFace: true,
            particlesCount: 256*256,
            automateParameters: true
        },
        loop: {
            faceDetectionStartTime: 8,
            faceDetectedMorphDuration: 10,
            morphStart: 5,
            morphDuration: 15,
            morphEnd: 5
        }
    }
}
