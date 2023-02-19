import OSC from "osc-js";
import {config} from "../../config";

export default class OSCClient {
    private readonly client: OSC;

    constructor() {
        this.client = new OSC();
        this.client.open({
            host: config.osc.host,
            port: config.osc.port
        });
    }

    isConnected() {
        return this.client.status() == OSC.STATUS.IS_OPEN;
    }

    sendMessage(address, ...parameters) {
        if (this.isConnected()) {
            const message = new OSC.Message(address, ...parameters);
            this.client.send(message);
        }
    }
}