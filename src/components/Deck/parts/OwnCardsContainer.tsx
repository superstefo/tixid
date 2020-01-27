import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Card from "./Card";
import Separator from "./Separator";
import { RouteComponentProps } from 'react-router';
import WebSocketService from '../../../services/WebSocketService';
import ContextBeanAware from '../../../services/ContextBeanAware';

type Props = { beanId: string, history: any } & RouteComponentProps<{}>;

type State = {
  beanId: string,
 // isVisible: boolean,
  gameId: string
//  cardId: string
};

let arg: Props;
class OwnCardsContainer extends React.Component<Props, State>{

  Refs: Array<any>

  constructor(props: {}) {
    super(arg);
    
    this.state = {
      beanId: "OwnCardsContainer1",
    //  opacity: props.opacity,
      gameId: "game-001",
    //  cardId: "card-002"
    };
  //  this.onClickFunc = props.onClickFunc;
  this.Refs = [];
  }

  componentDidMount() {///0886625452
    ContextBeanAware.add(this)
    WebSocketService.subscribe('/topic/card-on-deck/'+ this.state.gameId, this.callBack);
  }

  callBack = (messageOutput: any) => {
    
    console.log(messageOutput);
    let res = messageOutput?.body
    res = JSON.parse(res);
    console.log(res);
    let card = this.getCard(res?.cardId, this.Refs)//this.Refs[0];
    console.log(card);
    card?.setInvisible()

    let AllCardsRefs = ContextBeanAware.get("AllCardsContainer1")?.Refs;
    
    //this.setState({ opacity: 0 });
    // this.onClickFunc(this.onClick)"
  }

  getCard = (id: string, refs: Array<any>) => {

    for (let index = 0; index < refs.length; index++) {
      let card = refs[index];
      if (card?.state?.cardId === id) {
        return card
      }
    }
   return null;
  }

  clickOnCard = (cardOnclickFunc: Function) => {
    // let res = cardOnclickFunc();
    // console.log(res);
  }

  render() {
    let props = { beanId: "ss", onClickFunc: this.clickOnCard }
    return (
      <div id="ownCardsContainer" className="row" >

        <div className="col-sm"  >
          <Card opacity={1} {...props} ref={(input) => {this.Refs[0] = input }} />
        </div>

        <div className="col-sm" >
          <Card opacity={1} {...props} ref={(input) => {this.Refs[1] = input }} />
        </div>

        <div className="col-sm" >
          <Card opacity={1}  {...props} ref={(input) => {this.Refs[2] = input }} />
        </div>

        <div className="col-sm" >
          <Card opacity={1}{...props} ref={(input) => {this.Refs[3] = input }} />
        </div>

        <div className="col-sm" >
          <Card opacity={1}{...props} ref={(input) => {this.Refs[4] = input }} />
        </div>

        <div className="col-sm"  >
          <Card opacity={1}{...props} ref={(input) => {this.Refs[5] = input }} />
        </div>
      </div>
    );
  }
}

export default withRouter(OwnCardsContainer);
