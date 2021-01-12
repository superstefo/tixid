import React from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import Const from '../services/Constants';

class WebSocketService extends React.Component {
    subscribtions: Map<string, any>
    subscribeCalls: Map<string, Function>
    stompClient: any;
    reconnect: any;
    isConnected: boolean;
    constructor(props: {}) {
        super(props);
        this.subscribtions = new Map()
        this.subscribeCalls = new Map()
        this.isConnected = false;

    };

    closeEventCallback = (one1: any) => {
        console.log(one1);
        this.isConnected = false;

        let connectFunc = this.connect;
        let reconnect = window.setTimeout(function () {

            connectFunc();
            window.clearTimeout(reconnect);
        }, 5000);
    }

    connect = () => {
        let sock = new SockJS(Const.URL.WS);

        let connectCallback = () => {
            this.isConnected = true;
            this.subscribeCalls.forEach((func, topic) => {
                this.subscribe(topic, func);
            })
        }

        this.stompClient = Stomp.over(sock);
        if (this.stompClient) {
            this.stompClient.connect("login", "passcode", connectCallback, this.closeEventCallback, "host222");
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
            return;
        }

        let subscribtion = this.stompClient.subscribe(topic, callback);
        this.subscribtions.set(topic, subscribtion);
    }

    unsubscribe = () => {
        this.subscribtions.forEach((k, v: any) => {
            console.log(k);
            console.log(v);
            k.unsubscribe();
        })
    }

    disconnect = () => {
        if (this.stompClient != null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }
}
export default new WebSocketService({});