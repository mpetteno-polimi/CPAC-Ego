
export default class AutomationHelper {

    getStaticSphereParameters(timeControls) {
        let mod1 = this.LFO('sin', 0.07, 0, 1)
        let mod2 = this.LFO('sin', 0.23, 0, 1)
        let bloomStrength = this.LFO('sin', 0.13, 0.2, 0.2+mod2);
        let noiseAmp = 0.45+mod1*0.3;
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: 0.1+mod1,
            noiseAmp: noiseAmp,
            noiseRadius: 1+mod2,
            noiseFreq: 5+15*mod2,
            noiseSpeed: 3,
            noiseType: 4,
            cameraDistance: this.LFO('sin', 0.1, 2.5, 3),
            audioParam1: this.clampAndNormalize(bloomStrength, 0.2, 1.4),
            audioParam2: this.clampAndNormalize(noiseAmp, 0.45, 1.05)
        }
    }

    getSphereToFaceParameters(timeControls) {
        return this.getStaticSphereParameters(timeControls);
    }

    getStaticFaceParameters(timeControls) {
        return this.getStaticSphereParameters(timeControls);
    }

    getFaceToMorphTargetParameters(timeControls) {
        let mod1 = this.LFO('sin', 0.07, 0, 1)
        let mod2 = this.LFO('sin', 0.23, 0, 1)
        let bloomStrength = mod2*0.2;
        let noiseAmp = mod2*0.3;
        return {
            bloomStrength: bloomStrength,
            bloomThreshold: 0,
            bloomRadius: mod1*0.5,
            noiseAmp: noiseAmp,
            noiseRadius: 1+mod2,
            noiseFreq: 5+15*mod2,
            noiseSpeed: 0.001+mod1*0.005+mod1*mod2*0.1,
            noiseType: 4,
            cameraDistance: this.LFO('sin', 0.1, 2.5, 3),
            audioParam1: this.clampAndNormalize(bloomStrength, 0.2, 1.4),
            audioParam2: this.clampAndNormalize(noiseAmp, 0.45, 1.05)
        }
    }


    getStaticMorphTargetParameters(timeControls) {
        return this.getStaticSphereParameters(timeControls);
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