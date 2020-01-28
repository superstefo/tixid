import React from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

class WebSocketService extends React.Component {

    stompClient: any
    gameId: string
    constructor(props: {}) {
        super(props);
        //this.context = {};
        this.gameId = "game-001"
    };

    connect = () => {
        var url = 'http://localhost:8585/gs-guide-websocket';
        var options = {};
        var sock = new SockJS(url, null, options);
        sock.onopen = function () {
            console.log('open');
        };

        sock.onmessage = function (e: any) {
            console.log('message');
            console.log(e);
        };

        sock.onerror = function (e: any) {
            console.error(e);
        };

        sock.onclose = function () {
            console.log('close');
        };

        let connectCallback = (frame: any) => {
        }
      //    console.log(frame);
            //    this.stompClient.subscribe('/topic/greetings555555', (messageOutput: any) => {
            //         console.log(messageOutput);
            //         console.log("messageOutput");
            //         //this.showMessageOutput(JSON.parse(messageOutput.body));
            //     });

        let errorCallback = (one: any, two: any) => {
            console.log(one);
            console.log(two);
        }

        let closeEventCallback = (one: any, two: any) => {
            console.log(one);
            console.log(two);
        }

        this.stompClient = Stomp.over(sock);
        if (this.stompClient) { ///client.connect(headers, connectCallback, errorCallback, closeEventCallback);
            this.stompClient.connect({}, connectCallback, errorCallback, closeEventCallback)
            this.stompClient.reconnect_delay = 5000;
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