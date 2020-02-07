import React from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';


class WebSocketService extends React.Component {
    subscribtions: Map<string, any>
    subscribeCalls: Map<string, Function>
    stompClient: any
    gameId: string
    isConnected: boolean
    constructor(props: {}) {
        super(props);
        //this.context = {};
        this.gameId = "game-001"
        this.subscribtions = new Map()
        this.subscribeCalls = new Map()
        this.isConnected = false;
    };

    connect = () => {
         /////////////////////////////////////////////////////////////////////////////////////////////////////
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
            this.isConnected = true;

            this.subscribeCalls.forEach((func, topic) => {
                this.subscribe(topic, func);
            })
            this.subscribeCalls = new Map();
        }

        let closeEventCallback = (one1: any) => {
            console.log(one1);
            this.isConnected = false;
            this.subscribeCalls = new Map();
        }

        this.stompClient = Stomp.over(sock);
        if (this.stompClient) {
            this.stompClient.connect("login", "passcode", connectCallback, closeEventCallback, "host222");
            this.stompClient.reconnect_delay = 5000;
        }
    }

    subscribe = (topic: string, callback: Function) => {
        if (this.stompClient === null || !topic || !callback) {
            return;
        }
        if (this.subscribtions.has(topic)) {
            return;
        }
        if (!this.isConnected) {
            this.subscribeCalls.set(topic, callback);
        }
        let subscribtion = this.stompClient.subscribe(topic, callback);
        this.subscribtions.set(topic, subscribtion) //[topic] = subscribtion;
    }

    disconnect = () => {
        if (this.stompClient != null) {
            this.stompClient.disconnect();
            this.subscribtions = new Map();
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