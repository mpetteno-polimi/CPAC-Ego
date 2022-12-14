import OSC from "osc-js";

export default class OSCClient {
    private client: OSC;

    constructor() {
        this.client = new OSC({
            plugin: new OSC.WebsocketClientPlugin({
                host: "localhost",
                port: 3001,
                secure: true
            })
        });
        this.client.open();
    }

    sendMessage(options?) {
        const message = new OSC.Message('/test', 12.221, 'hello')
        console.log(message)
        this.client.send(message)
    }
}