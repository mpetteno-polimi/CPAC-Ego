import {config} from "../../config";

export default class WebcamVideo {
    videoTarget: HTMLVideoElement
    videoConstraints: { audio: boolean; video: { width: number; height: number } }
    aspectRatio: number
    onReceivingData: () => void

    constructor(onReceivingData: () => void) {
        this.videoTarget = document.createElement('video')
        this.videoConstraints = {audio: false, video: {width: config.webcam.widthRes, height: config.webcam.heightRes}}
        this.aspectRatio = this.videoConstraints.video.width / this.videoConstraints.video.height
        this.onReceivingData = onReceivingData
        this.init()
    }

    private init() {
        navigator.mediaDevices.getUserMedia(this.videoConstraints).then((mediaStream) => {
            this.videoTarget.srcObject = mediaStream
            this.videoTarget.onloadedmetadata = () => this.onLoadMetadata()
        }).catch(function (err) {
            alert(err.name + ': ' + err.message)
        })
    }

    private onLoadMetadata() {
        this.videoTarget.setAttribute('autoplay', 'true')
        this.videoTarget.setAttribute('playsinline', 'true')
        this.videoTarget.play()
        this.onReceivingData()
    }
}