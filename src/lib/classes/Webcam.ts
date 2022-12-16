import {config} from "../../config";

export default class Webcam {
    video: HTMLVideoElement
    videoConfig: MediaStreamConstraints
    constructor(video: HTMLVideoElement) {
        this.video = video;
        this.videoConfig = {
            audio: false,
            video: {
                facingMode: 'user',
                width: config.webcam.widthRes,
                height: config.webcam.heightRes,
                frameRate: {
                    ideal: config.webcam.fps
                }
            }
        };
    }

    async setup() {
        this.video.srcObject = await navigator.mediaDevices.getUserMedia(this.videoConfig);
        return new Promise((resolve) => {
            this.video.onloadedmetadata = () => {
                this.video.width = this.video.videoWidth;
                this.video.height = this.video.videoHeight;
                resolve(this.video.play());
            };
        });
    }

}