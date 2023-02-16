import OSC from "osc-js";

export default class OSCClient {
    private readonly client: OSC;

    constructor() {
        this.client = new OSC();
        this.client.open();
    }

    isConnected() {
        return this.client.status() == 1;
    }

    sendMessage(address, ...parameters) {
        if (this.isConnected()) {
            const message = new OSC.Message(address, ...parameters);
            this.client.send(message);
        }
    }
}