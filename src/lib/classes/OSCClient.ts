import OSC from "osc-js";

export default class OSCClient {
    private client: OSC;

    constructor() {
        this.client = new OSC();
        this.client.open();
    }

    sendMessage(address, ...parameters) {
        const message = new OSC.Message(address, ...parameters);
        this.client.send(message)
    }
}