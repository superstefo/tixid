import React from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
//var sockjsClient = require("sockjs-client")

class WebSocketService extends React.Component {
    stompClient444!: {
        connect: (first: any, sec: any) => {};
        subscribe: (first: any, sec: any) => {};
        disconnect: () => {};
        send: (first: any, sec: any, third: any) => {};
    }; 
    stompClient: any
  constructor(props: {}) {
    super(props);
    this.context= {};

    //var sock = new SockJS('https://mydomain.com/my_prefix');
    ///var sockjs =  ""//SockJS("url", ()=> {}, ()=> {}, ()=> {});
    console.log("--------------------------------------- init ------------------------------" );
    
  };

  
//  loadScript = (url: string, callback: Function) =>{

//     let script = document.createElement("script")
//     script.type = "text/javascript";

//     // script.onload = function(){
//     //     callback();
//     // };
    

//     script.src = url;
//     document.getElementsByTagName("head")[0].appendChild(script);
//     return script;
// }

//ss = this.loadScript("", ()=>{});


       
    connect = () => {
        var url = 'http://localhost:8585/gs-guide-websocket';
        var options = {};
        var sockjs = new SockJS(url, null, options);
        this.stompClient  = Stomp.over(sockjs);
        if (  this.stompClient  ) {
            this.stompClient.connect({},  (frame: any) =>{
            //setConnected(true);
            console.log('Connected: ' + frame);
        this.stompClient.subscribe('/topic/greetings', (messageOutput: any) => {
            console.log(messageOutput);
            
                //this.showMessageOutput(JSON.parse(messageOutput.body));
            });
    })}
     }
             
    disconnect= () =>  {
        if(this.stompClient != null) {
               this. stompClient.disconnect();
        }
       
        console.log("Disconnected");
    }
             
 sendMessage =()  =>  {
var from = "stefan";
var text = 'text';
this.stompClient.send("/app/hello", {}, 
  JSON.stringify({'from':from, 'text':text}));
        }


//   add = (bean) => {
//     if (!bean || !bean.state) {
//       throw new Error("Not allowed 'null' values for 'bean': " + bean + " !");
//     }
//     let beanId = bean.state.beanId || bean.props.beanId;
//     if (!beanId) {
//       throw new Error("Not allowed 'null' value for 'beanId' " + beanId  + " !" );
//     }
//     if (this.context[beanId]) {
//       console.warn("Bean with 'beanId': " + beanId + "is already registered under BeanContextAware!");
//     }
//     this.context[beanId] = bean;
//   }

//   get = (beanId) => {
//     if (!beanId ) {
//       throw new Error("Not allowed 'null' value for 'beanId' " + beanId + " !" );
//     }
//     return this.context[beanId];
//   }

//   remove = (bean) => {
//     if (!bean) {
//       throw new Error("Not allowed 'null' value for 'bean' " + bean + " !" );
//     }
//     if ( typeof bean === 'string' ) {
//         delete this.context[bean];
//         return;
//     }
//     let beanId = bean.state.beanId || bean.props.beanId;
//     delete this.context[beanId];
//   }
}
export default new WebSocketService({});