import type {AppConfig} from "./lib/interfaces/Config";

export const config: AppConfig = {
    scenes: {
        splashScreen: {
            title: "ego",
            subtitle: "",
            font: {
                fnt: "/fonts/msdf/roboto-regular.fnt",
                atlas: "/fonts/msdf/roboto-regular.png"
            },
            transition: {
                in: {
                    delay: 0,
                    duration: 0
                },
                out: {
                    delay: 1,
                    duration: 5000
                }
            },
            camera: {
                fieldOfView: 75,
                nearPlane: 0.1,
                farPlane: 10000
            },
            automateParameters: true
        },
        world: {
            transition: {
                in: {
                    delay: 2,
                    duration: 5000
                },
                out: {
                    delay: 0,
                    duration: 0
                }
            },
            camera: {
                fieldOfView: 75,
                nearPlane: 0.01,
                farPlane: 100
            },
            particlesCount: 256*256,
            automateParameters: true
        },
    },
    faceMeshDetector: {
        detector: {
            runtime: 'mediapipe',
            refineLandmarks: false,
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
            maxFaces: 1
        },
        estimator: {
            flipHorizontal: false,
            staticImageMode: false
        },
        faceScaleFactor: 1,
        triangulateFace: true
    },
    faceExpressionDetector: {

    },
    morphTargetGenerator: {
        perlin: {
            canvasWidth: 4,
            canvasHeight: 4
        },
        svg: {
            paths: [
                {
                    path: "/images/svg/card_1.svg",
                    scaleFactor: 0.01
                },
                {
                    path: "/images/svg/card_2.svg",
                    scaleFactor: 0.007
                },
                {
                    path: "/images/svg/card_3.svg",
                    scaleFactor: 0.007
                },
                {
                    path: "/images/svg/card_4.svg",
                    scaleFactor: 0.007
                },
                {
                    path: "/images/svg/card_5.svg",
                    scaleFactor: 0.007
                },
                {
                    path: "/images/svg/card_6.svg",
                    scaleFactor: 0.007
                },
                {
                    path: "/images/svg/card_7.svg",
                    scaleFactor: 0.007
                },
                {
                    path: "/images/svg/card_8.svg",
                    scaleFactor: 0.007
                },
                {
                    path: "/images/svg/card_9.svg",
                    scaleFactor: 0.007
                },
                /*{
                    path: "/images/svg/card_10.svg",
                    scaleFactor: 0.007
                }*/
            ]
        },
        symmetric: {
            time: 100,
            pointsCount: 40
        }
    },
    music: {
        player: {

        },
        toneJS: {

        },
        generator: {
            bassEnabled: true
        }
    },
    webcam: {
        widthRes: 1280,
        heightRes: 720,
        fps: 60
    },
    loop: {
        faceDetectionStartTime: 8,
        faceDetectedMorphDuration: 20,
        morphStart: 8,
        morphDuration: 30,
        morphEnd: 8
    },
    osc: {
        host: "localhost",
        port: 8080
    },
    colors: {
        primary: 0xFFFFFF,
        primaryVariant: 0xFBFBFB,
        secondary: 0xFFFFFF,
        secondaryVariant: 0xFFFFFF,
        background: 0x000000
    }
}
