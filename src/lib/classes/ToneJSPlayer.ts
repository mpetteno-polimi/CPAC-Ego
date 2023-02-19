import * as Tone from 'tone'

export default class ToneJSPlayer {

    synthChord: Tone.Synth<Tone.SynthOptions>;
    synthDrone: Tone.Synth<Tone.SynthOptions>;
    synthNoiseDrone: Tone.Synth<Tone.SynthOptions>;
    synthLead: Tone.Synth<Tone.SynthOptions>;
    synthBass: Tone.Synth<Tone.SynthOptions>;
    reverb: Tone.Reverb;

    constructor() {

        console.log("Initializing synths")

        this.reverb = new Tone.Reverb ({
            decay : 1.5 ,
            preDelay : 0.01
            });
        // this.reverb.connect(Tone.Master);
        this.synthChord = new Tone.Synth().toDestination();
        this.synthDrone = new Tone.Synth().toDestination();
        this.synthNoiseDrone = new Tone.Synth().toDestination();
        this.synthLead = new Tone.Synth({

            "portamento" : 0.02,
            "oscillator": {
                "type": "square4"
            },
            "envelope": {
                "attack": 2,
                "decay": 1,
                "sustain": 0.2,
                "release": 2
            },
            "volume" : - 12
        }).toDestination();
        this.synthBass = new Tone.Synth({
                "oscillator": {
                    "type": "fmsquare5",
                    "modulationType" : "triangle",
                      "modulationIndex" : 2,
                      "harmonicity" : 0.501
                },

                "envelope": {
                    "attack": 0.01,
                    "decay": 0.1,
                    "sustain": 0.4,
                    "release": 2
                }
            }).toDestination();

    }

    playChord(note) {
        let noteString = Tone.Frequency(note, "midi").toNote();
        this.synthChord.triggerAttackRelease(noteString, "8n");
    }

    startDrone() {
        console.log("Start drone")
        let now = Tone.now();
        this.synthDrone.triggerAttack("C2", now);
    }

    startNoiseDrone() {
        console.log("Start noise drone")
        let now = Tone.now();
        this.synthNoiseDrone.triggerAttack("C2", now);
    }

    stopDrone() {
        console.log("Stop drone")
        let now = Tone.now();
        this.synthNoiseDrone.triggerRelease(now + 1);
    }

    playNote(note) {
        console.log("play note")
        console.log(note);
        let noteString = Tone.Frequency(note, "midi").toNote();
        this.synthLead.triggerAttackRelease(noteString, "1n");

    }

    playBass(note) {
        let noteString = Tone.Frequency(note, "midi").toNote();
        this.synthBass.triggerAttackRelease(noteString, "2n");
    }

    setAudioParams(p1, p2, p3, p4) {
        // todo
    }

}