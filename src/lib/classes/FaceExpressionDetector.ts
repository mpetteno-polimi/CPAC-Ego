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
        await this.nets.ssdMobilenetv1.loadFromUri("/CPAC-Ego/models");
        await this.nets.faceLandmark68Net.loadFromUri("/CPAC-Ego/models");
        await this.nets.faceRecognitionNet.loadFromUri("/CPAC-Ego/models");
        await this.nets.faceExpressionNet.loadFromUri("/CPAC-Ego/models");
        await this.nets.ageGenderNet.loadFromUri("/CPAC-Ego/models");
    }

    detectExpressions() {
        return faceapi.detectAllFaces(this.webcam.video).withFaceExpressions();
    }

}