/*
Generates a sequence of notes based on Markov chains of order 2, (or, optionally, order 1).
The sequence is (optionally) altered over time with a certain chance.
The probabilities for the note generation Markov table are derived from Face Mesh's landmarks, so the note generation model is a function of the face and its position.
An estimation of the face distance is used to control random octave jumps (the closer the face the more probable the octave jump).
The face distance also controls the bpm.
A markov chain of order 1 controls the duration of the notes.
*/
import type {Face} from "@tensorflow-models/face-landmarks-detection";
import OSCClient from "./OSCClient";
import {config} from "../../config";

export default class MusicGenerator {
    NoteGenerationMarkovOrder = 2;
    noteMarkovTable = [];
    scales = [
        [0, 2, 4, 5, 7, 9, 11],  // happy
        [0, 2, 3, 5, 7, 8, 11],  // sad
        [0, 2, 4, 6, 7, 9, 11],  // surprised
        [0, 2, 4, 6, 8, 10, 12], // neutral
        [0, 1, 5, 6, 9, 11, 12], // disgusted, questa è a casaccio
        [0, 2, 3, 5, 6, 8, 11],  // fearful (?)
        [0, 1, 3, 5, 7, 8, 10]   // angry
    ]
    scale = this.scales[0];
    history = [];
    faceDistance = 1;
    MakeUniform = 10; // constant from 1 to idk, 20; the smaller the constant the more uniform the probability distribution in markov's table; best to keep it halfway;
    baseNote = 48;
    noteDuration = [1 / 16, 1 / 8, 1 / 4, 1 / 2, 1]
    noteDurationHistory = 4;
    noteDurationMarkovTable = [
        [0.8, 0.08, 0.06, 0.04, 0.02], // 16th
        [0.1, 0.6, 0.1, 0.1, 0.1],     // 8th
        [0.05, 0.1, 0.5, 0.2, 0.15],   // 4th
        [0.02, 0.08, 0.1, 0.6, 0.2],   // 2nd
        [0.02, 0.08, 0.2, 0.2, 0.5],   // 1
    ]
    bpmMin = 5;
    bpmMax = 100;
    bpm = 40;
    currentSequence = [];
    seqCurrentIndex = -1;
    minSeqLength = 8;
    maxSeqLength = 32;
    alterSeq = true;
    alterChance = 0.2;
    private oscClient: OSCClient;
    private bassEnabled: boolean;
    private sequenceTimeout: NodeJS.Timeout;

    constructor() {
        this.oscClient = new OSCClient();
        this.noteMarkovTable = new Array(Math.pow(7, this.NoteGenerationMarkovOrder));
        for (let i = 0; i < this.noteMarkovTable.length; i++) {
            this.noteMarkovTable[i] = new Array(7);
            for (let j = 0; j < 7; j++) {
                this.noteMarkovTable[i][j] = 1 / 7;
            }
        }
        this.NoteGenerationMarkovOrder == 1 ? this.history = [0] : this.history = [0, 0];
        this.bassEnabled = config.music.generator.bassEnabled;
        this.sequenceTimeout = null;
    }

    updateFromFaceEstimation(estimatedFace: Face) {
        this.processFaceLandmarks(estimatedFace.keypoints);
        this.setFaceDistance(estimatedFace.box.width, estimatedFace.box.height);
    }

    generateNewSequence() {
        let seqLength = this.minSeqLength + Math.floor(Math.random() * (this.maxSeqLength - this.minSeqLength));
        for (let i = 0; i < seqLength; i++) {
            this.currentSequence.push(this.generateNote());
        }
    }

    forwardSequence() {
        this.seqCurrentIndex = (this.seqCurrentIndex + 1) % this.currentSequence.length;
        if (this.currentSequence.length < 1) {
            this.generateNewSequence()
        }
        if (this.alterSeq && Math.random() < this.alterChance) {
            this.currentSequence[this.seqCurrentIndex] = this.generateNote();
        }
        let note = this.currentSequence[this.seqCurrentIndex];
        return {'note': note['note'], 'duration': note['duration'] * 60000 / this.bpm};
    }

    generateNote() {
        // map history to markov table's rows
        let correspondingRow;
        if (this.NoteGenerationMarkovOrder == 1) {
            correspondingRow = this.history[0];
        } else {
            correspondingRow = this.history[0] * 7 + this.history[1];
        }
        let markovRow = [...this.noteMarkovTable[correspondingRow]];
        // exaggerate probability
        if (true) {
            let pow = 3;//Math.pow(2,this.faceDistance);
            let sum = 0;
            for (let i = 0; i < markovRow.length; i++) {
                markovRow[i] = Math.pow(markovRow[i], pow);
                sum += markovRow[i];
            }
            for (let i = 0; i < markovRow.length; i++) {
                markovRow[i] /= sum;
            }
        }
        // build cumulative distribution
        let cumulativeRow = new Array(7);
        cumulativeRow[0] = markovRow[0];
        for (let i = 1; i < 7; i++) {
            cumulativeRow[i] = markovRow[i] + cumulativeRow[i - 1];
        }
        // generate index (wrt scale[])
        let generatedIndex = -1;
        let rand = Math.random();
        for (let i = 0; i < 7; i++) {
            if (rand < cumulativeRow[i]) {
                generatedIndex = i;
                break;
            }
        }
        // update history
        this.history.shift();
        this.history.push(generatedIndex);
        // grab note
        let note = this.scale[generatedIndex];
        // use face distance estimation as probability to alter octave
        if (this.faceDistance > 1 && this.faceDistance < 1.7) {
            if (Math.random() * 5 < this.faceDistance) {
                note += 12;
            }
        } else {
            if (this.faceDistance > 1.7 && Math.random() * 10 < this.faceDistance) {
                note += 24;
            }
        }
        // generate note duration (same technique as for the note generation)
        let durationCumulativeProb = new Array(this.noteDuration.length);
        let durationMarkovRow = [...this.noteDurationMarkovTable[this.noteDurationHistory]];
        if (true) { // exaggerate probability
            let pow = 1.5;
            let sum = 0;
            for (let i = 0; i < durationMarkovRow.length; i++) {
                durationMarkovRow[i] = Math.pow(durationMarkovRow[i], pow);
                sum += durationMarkovRow[i];
            }
            for (let i = 0; i < durationMarkovRow.length; i++) {
                durationMarkovRow[i] /= sum;
            }
        }
        durationCumulativeProb[0] = durationMarkovRow[0];
        for (let i = 1; i < this.noteDuration.length; i++) {
            durationCumulativeProb[i] = durationMarkovRow[i] + durationCumulativeProb[i - 1];
        }
        generatedIndex = -1;
        rand = Math.random();
        for (let i = 0; i < durationCumulativeProb.length; i++) {
            if (rand < durationCumulativeProb[i]) {
                generatedIndex = i;
                break;
            }
        }
        generatedIndex = generatedIndex % 3;
        let duration = this.noteDuration[generatedIndex];
        this.noteDurationHistory = generatedIndex;
        return {'note': note + this.baseNote, 'duration': duration};
    }

    setSentiment(index) {
        this.scale = this.scales[index];
    }

    mapToRange(input, inMin, inMax, outMin, outMax) {
        if (input < inMin) return outMin;
        if (input > inMax) return outMax;
        return outMin + (outMax - outMin) * (input - inMin) / (inMax - inMin);
    }

    alterSequence(b) {
        this.alterSeq = b;
    }

    startPlayingSequence() {
        let note = this.forwardSequence();
        this.sequenceTimeout = setTimeout(this.startPlayingSequence, note['duration']);
        this.playNote(note['note']);
        // most stupid bass ever
        if (Math.random() < 0.1) this.playBass(Math.random() < 0.2 ? 0 : note['note'] - 24);
    }

    stopPlayingSequence() {
        clearTimeout(this.sequenceTimeout);
    }

    startDrone() {
        this.oscClient.sendMessage("/dronePlay", 1);
    }

    stopDrone() {
        this.oscClient.sendMessage("/dronePlay", 0);
    }

    playNote(note) {
        this.oscClient.sendMessage('/note', note);
    }

    playBass(note) {
        if (this.bassEnabled) this.oscClient.sendMessage('/bass', note);
    }

    /*function testOSC() {
        this.bassEnabled = true;
        setTimeout(function(){this.setSentiment(Math.floor(Math.random()*7))}, 10000);
        this.generateNewSequence();
        this.alterSequence(true);
        this.startPlayingSequence();
    }*/

    private processFaceLandmarks(data) {
        let flattenedData = this.flattenFaceData(data);
        // update note generation markov table
        let sum;
        let k;
        for (let i = 0; i < this.noteMarkovTable.length; i++) {
            sum = 0.0;
            for (let j = 0; j < 7; j++) {
                k = i * 3 * 7 + j * 3;
                this.noteMarkovTable[i][j] = Math.pow(flattenedData[k], this.MakeUniform * 2); // stupid math going on here, trying to make the distribution less uniform
                this.noteMarkovTable[i][j] += Math.pow(flattenedData[k + 1], this.MakeUniform * 2);
                //this.noteMarkovTable[i][j] += Math.pow(data[k+2], 2); //not using z coordinate because then we get an almost uniform distribution
                sum += this.noteMarkovTable[i][j];
            }
            // normalize
            for (let j = 0; j < 7; j++) {
                this.noteMarkovTable[i][j] /= sum;
            }
        }
    }

    private flattenFaceData(data) {
        let filteredData = data.map((keypoint) => {
            return {
                x: keypoint.x,
                y: keypoint.y,
                z: keypoint.z
            }
        });
        return filteredData.flatMap((point) => Object.values(point));
    }

    private setFaceDistance(width, height) {
        // use face bounding box to estimate distance
        let area = width * height;
        this.faceDistance = this.mapToRange(area, 1000, 150000, 0, 2); //costanti molto euristiche che spero funzionino
        this.faceDistance > 1.5 ? this.baseNote = 60 : this.baseNote = 48;
        // update bpm
        this.bpm = this.mapToRange(this.faceDistance, 0, 2, this.bpmMin, this.bpmMax);
    }

}