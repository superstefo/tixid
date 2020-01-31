import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import OwnCard from "./OwnCard";
import PlayedCard from "./PlayedCard";
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

  store: any;
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
    this.store = {}
  }

  componentDidMount() {
    ContextBeanAware.add(this);
    WebSocketService.subscribe('/topic/card-on-deck/' + this.state.gameId, this.callBack);//// move this so to be global
  }

  componentWillUnmount() {
    ContextBeanAware.remove(this)
  }

  callBack = (messageOutput: any) => {
    //  console.log(messageOutput);
    let res = messageOutput?.body
    res = JSON.parse(res);
    // let card = this.getCard(res?.cardId, this.Refs);//this.Refs[0];
    //  console.log(card);
    //  card?.setInvisible();

    let AllCardsRefs = ContextBeanAware.get("PlayedCardsContainer1")?.Refs;
  
    this.placeCardOnDeck();
  }

  placeCardOnDeck = () => {
    let AllCardsRefs = ContextBeanAware.get("PlayedCardsContainer1")?.Refs;

    for (let index = 0; index < AllCardsRefs?.length; index++) {
      const element = AllCardsRefs[index] as PlayedCard;
      if (element?.state?.opacity === 0) {
        element.placeCardOnDeck()
        break
      }
    }
  }

  //Get
  // getCard = (id: string, refs: Array<any>) : OwnCard | null => {
  //   for (let index = 0; index < refs.length; index++) {
  //     let card = refs[index];
  //     if (card?.state?.cardId === id) {
  //       return card
  //     }
  //   }
  //   return null;
  // }

  clickOnCard = (cardOnclickFunc: Function) => {
    // let res = cardOnclickFunc();
    // console.log(res);
  }

  render() {
    let props = {
      beanId: "string",
      //opacity: 1,
      cardId: "",
      imgShown: "string",
      isFaceShown: true
    }

    return (
      <div id="ownCardsContainer" className="row" >

        <div className="col-sm"  >
          <OwnCard opacity={1}  {...props} ref={(input) => { this.Refs[0] = input }} />
        </div>

        <div className="col-sm" >
          <OwnCard opacity={1} {...props} ref={(input) => { this.Refs[1] = input }} />
        </div>

        <div className="col-sm" >
          <OwnCard opacity={1}  {...props} ref={(input) => { this.Refs[2] = input }} />
        </div>

        <div className="col-sm" >
          <OwnCard opacity={1}{...props} ref={(input) => { this.Refs[3] = input }} />
        </div>

        <div className="col-sm" >
          <OwnCard opacity={1}{...props} ref={(input) => { this.Refs[4] = input }} />
        </div>

        <div className="col-sm"  >
          <OwnCard opacity={1}{...props} ref={(input) => { this.Refs[5] = input }} />
        </div>
      </div>
    );
  }
}

export default withRouter(OwnCardsContainer);
