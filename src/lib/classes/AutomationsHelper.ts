import {config} from "../../config";
import {MathUtils} from "three";

export default class AutomationHelper {

    getStaticSphereParameters(timeControls) {
        let bloomStrength = this.LFO('impulse', 0.25, 0.2, 1.2, timeControls.globalElapsedTime, 1);
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: 0.1,
            sphereColor: config.colors.primary,
            faceColor: config.colors.secondary,
            morphTargetColor: config.colors.primary,
            backgroundColor: config.colors.background,
            noiseAmp: 0.025,
            noiseRadius: 1,
            noiseFreq: 1,
            noiseSpeed: 1,
            noiseType: 0,
            cameraAngle: 0,
            cameraDistance: 3,
            audioParam1: this.clampAndNormalize(bloomStrength, 0.2, 1.2),
            audioParam2: 0.6
        }
    }

    getSphereToFaceParameters(timeControls) {
        let progress = timeControls.faceDetectedElapsedTime/config.loop.faceDetectedMorphDuration;
        let bloomStrength = this.LFO('beta', 0, 0, 1.2, progress, 5);
        let bloomRadius = this.LFO('beta', 0, 0, 0.2, progress, 5);
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: bloomRadius,
            sphereColor: config.colors.primary,
            faceColor: config.colors.secondary,
            morphTargetColor: config.colors.primary,
            backgroundColor: config.colors.background,
            noiseAmp: 0.005,
            noiseRadius: 1,
            noiseFreq: 1,
            noiseSpeed: 1,
            noiseType: 5,
            cameraAngle: this.LFO('sin', 1, 0, 2*Math.PI, progress)*bloomStrength,
            cameraDistance: MathUtils.lerp(3, 2.5, progress),
            audioParam1: this.clampAndNormalize(bloomStrength, 0, 1.2),
            audioParam2: 0.6
        }
    }

    getStaticFaceParameters(timeControls) {
        return {
            bloomStrength: 0,
            bloomThreshold: 0,
            bloomRadius: 0,
            sphereColor: config.colors.primary,
            faceColor: config.colors.secondary,
            morphTargetColor: config.colors.primary,
            backgroundColor: config.colors.background,
            noiseAmp: 0.025,
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
        let bloomStrength = this.LFO('beta', 0, 0, 2, progress);
        let bloomRadius = this.LFO('beta', 0, 0, 0.2, progress);
        let noiseAmp = this.LFO('beta', 0, 0, 0.18, progress);
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: bloomRadius,
            sphereColor: config.colors.primary,
            faceColor: config.colors.secondary,
            morphTargetColor: config.colors.primary,
            backgroundColor: config.colors.background,
            noiseAmp: noiseAmp,
            noiseRadius: 1,
            noiseFreq: Math.random()*45,
            noiseSpeed: 1,
            noiseType: Math.floor(7*Math.random()),
            cameraAngle: 0,
            cameraDistance: 2.5,
            audioParam1: this.clampAndNormalize(bloomStrength, 0, 2),
            audioParam2: this.clampAndNormalize(noiseAmp, 0, 0.18)
        }
    }


    getStaticMorphTargetParameters(timeControls) {
        return {
            bloomStrength: 0.2,
            bloomThreshold: 0,
            bloomRadius: 0.1,
            sphereColor: config.colors.primary,
            faceColor: config.colors.secondary,
            morphTargetColor: config.colors.primary,
            backgroundColor: config.colors.background,
            noiseAmp: 0.025,
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