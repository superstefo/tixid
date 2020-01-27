import React from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

class WebSocketService extends React.Component {

    stompClient: any
    gameId: string
    constructor(props: {}) {
        super(props);
        //this.context = {};
        this.gameId= "game-001"
    };
 
    connect = () => {
        var url = 'http://localhost:8585/gs-guide-websocket';
        var options = {};
        var sockjs = new SockJS(url, null, options);
        this.stompClient = Stomp.over(sockjs);
        if (this.stompClient) {
            this.stompClient.connect({}, (frame: any) => {
    
                console.log('Connected: ----------------');
            //    this.stompClient.subscribe('/topic/greetings555555', (messageOutput: any) => {
            //         console.log(messageOutput);
            //         console.log("messageOutput");
            //         //this.showMessageOutput(JSON.parse(messageOutput.body));
            //     });
            })
        }
    }

    subscribe = (topic: string, callback: Function) => {
        if (this.stompClient === null) {
            return;
        }

        this.stompClient.subscribe(topic, callback);
    }

    disconnect = () => {
        if (this.stompClient != null) {
            this.stompClient.disconnect();
        }

        console.log("Disconnected");
    }

    sendMessage = () => {
        var from = "stefan";
        var text = 'text';
        this.stompClient.send("/app/hello", {},
            JSON.stringify({ 'from': from, 'text': text }));
    }

}
export default new WebSocketService({});