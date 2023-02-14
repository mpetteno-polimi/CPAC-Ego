import OSC from "osc-js";

export default class OSCClient {
    private readonly client: OSC;

    constructor() {
        this.client = new OSC();
        this.client.open();
    }

    sendMessage(address, ...parameters) {
        if (this.client.status() == 1) {
            const message = new OSC.Message(address, ...parameters);
            this.client.send(message);
        }
    }
}