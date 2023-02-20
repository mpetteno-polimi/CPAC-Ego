import {config} from "../../config";
import {MathUtils} from "three";

export default class AutomationHelper {

    getStaticSphereParameters(timeControls) {
        let mod1 = this.LFO('sin', 0.07, 0, 1)
        let mod2 = this.LFO('sin', 0.23, 0, 1)
        let bloomStrength = this.LFO('sin', 0.13, 0.2, 0.2+mod2);
        let noiseAmp = 0.45+mod1*0.3;
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: 0.5,
            primaryColor: 0xFFFFFF,
            primaryVariant: 0xFFFFFF,
            secondaryColor: 0xFFFFFF,
            secondaryVariantColor: 0xFFFFFF,
            backgroundColor: 0x000000,
            noiseAmp: 0.05,
            noiseRadius: 1,
            noiseFreq: 1,
            noiseSpeed: 1,
            noiseType: 0,
            cameraAngle: 0,
            cameraDistance: 4,
            audioParam1: this.clampAndNormalize(bloomStrength, 0.2, 1.4),
            audioParam2: this.clampAndNormalize(noiseAmp, 0.45, 1.05)
        }
    }

    getSphereToFaceParameters(timeControls) {
        let progress = timeControls.faceDetectedElapsedTime/config.loop.faceDetectedMorphDuration;
        console.log("S to F", progress)
        let bloomStrength = MathUtils.lerp(0, 3.5, progress);
        let noiseAmp = MathUtils.lerp(0, 0.5, progress);
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: MathUtils.lerp(0, 0.2, progress),
            primaryColor: 0xFFFFFF,
            primaryVariant: 0xFFFFFF,
            secondaryColor: 0xFFFFFF,
            secondaryVariantColor: 0xFFFFFF,
            backgroundColor: 0x000000,
            noiseAmp: noiseAmp,
            noiseRadius: 1,
            noiseFreq: 1,
            noiseSpeed: 1,
            noiseType: Math.floor(7*Math.random()),
            cameraAngle: 0,
            cameraDistance: MathUtils.lerp(4, 2.5, progress),
            audioParam1: this.clampAndNormalize(bloomStrength, 0.2, 1.4),
            audioParam2: this.clampAndNormalize(noiseAmp, 0.45, 1.05)
        }
    }

    getStaticFaceParameters(timeControls) {
        let mod1 = this.LFO('sin', 0.07, 0, 1)
        let mod2 = this.LFO('sin', 0.23, 0, 1)
        let bloomStrength = this.LFO('sin', 0.13, 0.2, 0.2+mod2);
        let noiseAmp = 0.45+mod1*0.3;
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: 0.5,
            primaryColor: 0xFFFFFF,
            primaryVariant: 0xFFFFFF,
            secondaryColor: 0xFFFFFF,
            secondaryVariantColor: 0xFFFFFF,
            backgroundColor: 0x000000,
            noiseAmp: 0.05,
            noiseRadius: 1,
            noiseFreq: 1,
            noiseSpeed: 1,
            noiseType: 0,
            cameraAngle: 0,
            cameraDistance: 2.5,
            audioParam1: this.clampAndNormalize(bloomStrength, 0.2, 1.4),
            audioParam2: this.clampAndNormalize(noiseAmp, 0.45, 1.05)
        }
    }

    getFaceToMorphTargetParameters(timeControls) {
        let progress = timeControls.morphElapsedTime/config.loop.morphDuration;
        let bloomStrength = MathUtils.lerp(0, 3.5, progress);
        let noiseAmp = MathUtils.lerp(0, 0.5, progress);
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: MathUtils.lerp(0, 0.2, progress),
            primaryColor: 0xFFFFFF,
            primaryVariant: 0xFFFFFF,
            secondaryColor: 0xFFFFFF,
            secondaryVariantColor: 0xFFFFFF,
            backgroundColor: 0x000000,
            noiseAmp: noiseAmp,
            noiseRadius: 1,
            noiseFreq: 1,
            noiseSpeed: 1,
            noiseType: Math.floor(7*Math.random()),
            cameraAngle: 0,
            cameraDistance: MathUtils.lerp(4, 2.5, progress),
            audioParam1: this.clampAndNormalize(bloomStrength, 0.2, 1.4),
            audioParam2: this.clampAndNormalize(noiseAmp, 0.45, 1.05)
        }
    }


    getStaticMorphTargetParameters(timeControls) {
        let mod1 = this.LFO('sin', 0.07, 0, 1)
        let mod2 = this.LFO('sin', 0.23, 0, 1)
        let bloomStrength = this.LFO('sin', 0.13, 0.2, 0.2+mod2);
        let noiseAmp = 0.45+mod1*0.3;
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: 0.5,
            primaryColor: 0xFFFFFF,
            primaryVariant: 0xFFFFFF,
            secondaryColor: 0xFFFFFF,
            secondaryVariantColor: 0xFFFFFF,
            backgroundColor: 0x000000,
            noiseAmp: 0.05,
            noiseRadius: 1,
            noiseFreq: 1,
            noiseSpeed: 1,
            noiseType: 0,
            cameraAngle: 0,
            cameraDistance: 2.5,
            audioParam1: this.clampAndNormalize(bloomStrength, 0.2, 1.4),
            audioParam2: this.clampAndNormalize(noiseAmp, 0.45, 1.05)
        }
    }

    private clampAndNormalize(input, min, max) {
        let val = Math.min(Math.max(input, min), max);
        val = (val - min)/(max - min);
        return val;
    }

    private LFO(type, freq, min, max) {
        let millis = Date.now()/1000.0;
        switch(type) {
            case 'sin':
                return min + (0.5+Math.sin(freq*millis)/2)*(max-min);
        }
    }

}