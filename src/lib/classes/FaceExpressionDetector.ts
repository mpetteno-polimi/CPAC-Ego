import type Webcam from "./Webcam";

import * as faceapi from '@vladmandic/face-api';

export default class FaceExpressionDetector {
    private nets: {
        ssdMobilenetv1: faceapi.SsdMobilenetv1;
        tinyFaceDetector: faceapi.TinyFaceDetector;
        tinyYolov2: faceapi.TinyYolov2;
        faceLandmark68Net: faceapi.FaceLandmark68Net;
        faceLandmark68TinyNet: faceapi.FaceLandmark68TinyNet;
        faceRecognitionNet: faceapi.FaceRecognitionNet;
        faceExpressionNet: faceapi.FaceExpressionNet;
        ageGenderNet: faceapi.AgeGenderNet
    };
    private webcam: Webcam;

    constructor(webcam: Webcam) {
        this.nets = faceapi.nets;
        this.webcam = webcam;
    }

    async loadModels() {
        await this.nets.ssdMobilenetv1.loadFromUri("/models");
        await this.nets.faceLandmark68Net.loadFromUri("/models");
        await this.nets.faceRecognitionNet.loadFromUri("/models");
        await this.nets.faceExpressionNet.loadFromUri("/models");
        await this.nets.ageGenderNet.loadFromUri("/models");
    }

    async detectExpressions() {
        return await faceapi.detectAllFaces(this.webcam.video).withFaceExpressions();
    }

}