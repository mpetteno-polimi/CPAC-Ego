import * as Tone from 'tone'
import {config} from "../../config";

export default class ToneJSPlayer {

    synthChord: Tone.PolySynth;
    synthDrone: Tone.Synth<Tone.SynthOptions>;
    synthNoiseDrone: Tone.NoiseSynth;
    synthLead: Tone.Synth<Tone.SynthOptions>;
    synthBass: Tone.Synth<Tone.SynthOptions>;
    reverb: Tone.Reverb;
    filterLead: Tone.Filter;
    filterDrone: Tone.Filter;

    constructor() {

        // instantiate the reverb
        this.reverb = new Tone.Reverb ({
            decay : 1.5 ,
            preDelay : 0.01,
            wet : 0.5
            });

        // instantiate the lead synth
        this.synthLead = new Tone.Synth({

            "portamento" : 0.08,
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
        });

        // instantiate the low pass for the lead synth
        this.filterLead = new Tone.Filter(4000, "lowpass");
        this.synthLead.chain(this.filterLead,this.reverb,Tone.Destination);

        // instantiate the bass
        this.synthBass = new Tone.Synth({
                "oscillator": {
                    "type": "fmsquare5",
                    "modulationType" : "triangle",
                      "modulationIndex" : 2,
                      "harmonicity" : 0.501
                },

                "portamento" : 0.08,
                "envelope": {
                    "attack": 0.01,
                    "decay": 0.1,
                    "sustain": 0.4,
                    "release": 2
                },
                "volume" : - 18
            }).toDestination();

            // instantiate chord synth
            this.synthChord = new Tone.PolySynth({
            "volume" : - 12}).toDestination();
            

            // instastiate the pitched drone
            this.synthDrone = new Tone.Synth({

                    "oscillator": {
                        "type": "fatsine4",
                        "spread" : 60,
                        "count" : 10
                    },
                    "envelope": {
                        "attack": 0.4,
                        "decay": 0.01,
                        "sustain": 1,
                        "attackCurve" : "sine",
                        "releaseCurve" : "sine",
                        "release": 0.4
                    },
                    "volume" : - 12
                }).toDestination();

            this.filterDrone = new Tone.Filter(2000, "lowpass");
            this.filterDrone.chain(this.filterDrone,Tone.Destination);
            
            // instantiate the noise drone
            this.synthNoiseDrone = new Tone.NoiseSynth({
                    "noise": {
                    "type": "pink",
                    "playbackRate" : 0.1
                },
                "envelope": {
                    "attack": 0.5,
                    "decay": 2,
                    "sustain": 0.5,
                    "release": 3
                },
                "volume" : - 18
            });

            this.synthNoiseDrone.chain(this.reverb,Tone.Destination);
        
         // for debug
         /*
         this.synthDrone.triggerAttack("C2", Tone.now() + 1);
         this.synthNoiseDrone.triggerAttack("C2", Tone.now() + 2);
         */
        

    }

    playChord(note) {
        if (config.music.toneJS.chordsEnabled) {
            const now = Tone.now();
            let noteString = Tone.Frequency(note, "midi").toNote();
            this.synthChord.triggerRelease(now);
            this.synthChord.triggerAttack(noteString, "1n", now + 0.5);
        }
    }


    startDrone() {
        const now = Tone.now();
        this.synthDrone.triggerAttack("C2", now);
    }

    startNoiseDrone() {
        const now = Tone.now();
        this.synthNoiseDrone.triggerAttack(now, 0.6);
    }

    stopDrone() {
        const now = Tone.now();
        this.synthDrone.triggerRelease(now);
    }

    playNote(note) {
        let now = Tone.now();
        let noteString = Tone.Frequency(note, "midi").toNote();
        this.synthLead.triggerRelease(now);
        this.synthLead.triggerAttack(noteString,  now + 0.5);

    }

    playBass(note) {
        let now = Tone.now();
        let noteString = Tone.Frequency(note, "midi").toNote();
        this.synthBass.triggerAttack(noteString, now);
    }


    setAudioParams(p1, p2, p3, p4) {

        this.filterLead.set({
            frequency: 2000 + p1 * 1000
        });

        this.filterDrone.set({
            frequency: 500 + p2 * 1000
        });

        this.reverb.set({
            wet: 0.6 * p3
        });


    }

}