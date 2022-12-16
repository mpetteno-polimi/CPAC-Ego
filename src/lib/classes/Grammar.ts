import OSC from "osc-js";

export default class Grammar {
    private motherString = "";
    public generatedInstance;
    private sentiment = 0;
    private scale = [0, 2, 4, 5, 7, 9, 11]
    private baseNote = 48; // C3

    constructor(string?) {
        this.motherString = string;
    }

    generateInstance(){
        let arpeggioLength = Math.floor(8+Math.random()*24);
        this.generatedInstance = new OSCMessages();
        //this.baseNote =

        // GENERATE ARPEGGIO
        for(let i=0; i<arpeggioLength; i++){
            let randomScaleIndex = Math.floor(Math.random()*this.scale.length);
            let randomOctave = Math.floor(-1+Math.random()*3);
            let randomNote = this.baseNote+this.scale[randomScaleIndex]+randomOctave;
            let randomSubdivision = Math.pow(2, -2+Math.floor(Math.random()*6));
            let randomVelocity = 60+Math.floor(Math.random()*30);
            this.generatedInstance.pushMessage(new OSC.Message('/note', randomNote, randomSubdivision, randomVelocity));
        }
        /*
        this.generatedInstance.pushMessage(new OSC.Message('/note', 40+Math.floor(Math.random()*10), 1, 40));
        */
    }

    setSentiment(sentiment){
        this.sentiment = sentiment;
    }
}

class OSCMessages{
    public messages = [];

    constructor(){
        this.messages = [];
    }

    pushMessage(message){
        this.messages.push(message);
    }

}