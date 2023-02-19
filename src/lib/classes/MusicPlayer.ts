import OSCClient from "./OSCClient";
import ToneJSPlayer from "./ToneJSPlayer";

export default class MusicPlayer {

    private oscClient: OSCClient;
    private toneJsPlayer: ToneJSPlayer;

    constructor() {
        this.oscClient = new OSCClient();
        this.toneJsPlayer = new ToneJSPlayer();
    }

    playChord(note) {
        console.log("playing chord note", note)
        if (this.oscClient.isConnected()) {
            this.oscClient.sendMessage('/chord', note);
        } else {
            this.toneJsPlayer.playChord(note);
        }
    }

    startNoiseDrone(){
        if (this.oscClient.isConnected()) {
            this.oscClient.sendMessage("/noiseDronePlay");
        } else {
            this.toneJsPlayer.startNoiseDrone();
        }
    }

    startDrone() {
        if (this.oscClient.isConnected()) {
            this.oscClient.sendMessage("/dronePlay", 1);
        } else {
            this.toneJsPlayer.startDrone();
        }
    }

    stopDrone() {
        if (this.oscClient.isConnected()) {
            this.oscClient.sendMessage("/droneStop", 0);
        } else {
            this.toneJsPlayer.stopDrone();
        }
    }

    playNote(note) {
        if (this.oscClient.isConnected()) {
            this.oscClient.sendMessage('/note', note);
        } else {
            this.toneJsPlayer.playNote(note);
        }
    }

    playBass(note) {
        if (this.oscClient.isConnected()) {
            this.oscClient.sendMessage('/bass', note);
        } else {
            this.toneJsPlayer.playBass(note);
        }
    }

    setAudioParams(p1, p2, p3, p4) {
        if (this.oscClient.isConnected()) {
            this.oscClient.sendMessage('/param1', p1);
            this.oscClient.sendMessage('/param2', p2);
            this.oscClient.sendMessage('/param3', p3);
            this.oscClient.sendMessage('/param4', p4);
        } else {
            this.toneJsPlayer.setAudioParams(p1, p2, p3, p4);
        }
    }

}