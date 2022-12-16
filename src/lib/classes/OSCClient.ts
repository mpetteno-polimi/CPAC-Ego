import OSC from "osc-js";

export default class OSCClient {
    private client: OSC;

    constructor() {
        this.client = new OSC();
        this.client.open();
    }

    sendMessage(options?) {
        const message = new OSC.Message('/test', 12.221, 'hello')
        console.log("Sending OSC message...", message);
        this.client.send(message)
    }
}