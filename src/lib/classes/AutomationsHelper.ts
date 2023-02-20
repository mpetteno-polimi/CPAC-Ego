import {config} from "../../config";
import {MathUtils} from "three";

export default class AutomationHelper {

    getStaticSphereParameters(timeControls) {
        //let bloomStrength = this.LFO('sin', 0.25, 0.2, 1.5, timeControls.globalElapsedTime);
        let bloomStrength = this.LFO('impulse', 0.25, 0.2, 1.2, timeControls.globalElapsedTime, 1);
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: 0.1,
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
            cameraDistance: 3,
            audioParam1: this.clampAndNormalize(bloomStrength, 0.2, 1.4), // apertura stereo noise drone
            audioParam2: 0.6
        }
    }

    getSphereToFaceParameters(timeControls) {
        let progress = timeControls.faceDetectedElapsedTime/config.loop.faceDetectedMorphDuration;
        let bloomStrength = this.LFO('beta', 0, 0, 1.2, progress);
        let bloomRadius = this.LFO('beta', 0, 0, 0.2, progress);
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: bloomRadius,
            primaryColor: 0xFFFFFF,
            primaryVariant: 0xFFFFFF,
            secondaryColor: 0xFFFFFF,
            secondaryVariantColor: 0xFFFFFF,
            backgroundColor: 0x000000,
            noiseAmp: 0.005,
            noiseRadius: 1,
            noiseFreq: 1,
            noiseSpeed: 1,
            noiseType: 5,
            cameraAngle: this.LFO('sin', 2.5, 0, 2*Math.PI, progress)*bloomStrength,
            cameraDistance: MathUtils.lerp(3, 2.5, progress),
            audioParam1: this.clampAndNormalize(bloomStrength, 0.2, 1.4),
            audioParam2: 0.6
        }
    }

    getStaticFaceParameters(timeControls) {
        return {
            bloomStrength: 0,
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
            audioParam1: 0.6,
            audioParam2: 0.6
        }
    }

    getFaceToMorphTargetParameters(timeControls) {
        let progress = timeControls.morphElapsedTime/config.loop.morphDuration;
        let bloomStrength = this.LFO('beta', 0, 0, 1.4, progress);
        let bloomRadius = this.LFO('beta', 0, 0, 0.2, progress);
        let noiseAmp = this.LFO('beta', 0, 0, 0.5, progress);
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: bloomRadius,
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
            cameraDistance: 2.5,
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

    private LFO(type, freq, min, max, time = Date.now()/1000, slope=3) {
        switch(type) {
            case 'sin':
                return min + (0.5-Math.cos(freq*time)/2)*(max-min);
            case 'impulse':
                time = time%(1/freq)
                time = time/(1/freq)
                if(time<=0.5){
                    time*=2
                    return min+Math.pow(time, slope)*(max-min)
                }else{
                    time = (time-0.5)*2
                    return min+(1-Math.pow(time, slope))*(max-min)
                }
            case 'beta':
                return min+Math.pow(4, slope)*Math.pow(time*(1-time), slope)*(max-min)
        }
    }

}