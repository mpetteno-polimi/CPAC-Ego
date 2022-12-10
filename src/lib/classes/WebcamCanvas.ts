import WebcamVideo from "./WebcamVideo";
import {config} from "../../config";

export default class WebcamCanvas {
    private readonly webcamVideo: WebcamVideo
    canvas: HTMLCanvasElement
    canvasSize: number
    receivingStream: boolean
    private readonly canvasCtx: CanvasRenderingContext2D

    constructor(canvasSize = config.webcam.canvasSize) {
        this.webcamVideo = new WebcamVideo(this.setReceivingStream.bind(this))
        this.canvasSize = canvasSize
        this.canvas = document.createElement('canvas')
        this.canvasCtx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.receivingStream = false
        this.init()
    }

    private init() {
        this.canvas.width = this.canvasSize
        this.canvas.height = this.canvasSize / this.webcamVideo.aspectRatio
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    setReceivingStream() {
        this.receivingStream = true
    }

    updateFromWebCam() {
        this.canvasCtx.drawImage(this.webcamVideo.videoTarget, 0, 0, this.canvas.width, this.canvas.height)
    }
}