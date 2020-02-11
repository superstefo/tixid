import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import OwnCard, { CardProps } from "./OwnCard";
import PlayedCard from "./PlayedCard";
import Separator from "./Separator";
import { RouteComponentProps } from 'react-router';
import WebSocketService from '../../../services/WebSocketService';
import ContextBeanAware from '../../../services/ContextBeanAware';
import CashService from '../../../services/CashService';
type Props = { beanId: string, history: any } & RouteComponentProps<{}>;

type State = {
  gameId: string,
  cardProps: any
};

let arg: Props;
class OwnCardsContainer extends React.Component<Props, State>{
  store: any;
  beanId: string;
  Refs: Array<any>
  constructor(props: {}) {
    super(arg);
    this.state = {
      gameId: "gameId-000",
      cardProps: this.getCardProps()
    };
    //  this.onClickFunc = props.onClickFunc;
    this.beanId = "ownCardsContainer1"
    this.Refs = [];
    this.store = {}
  }

  componentDidMount() {
    ContextBeanAware.add(this);
    //  WebSocketService.subscribe('/topic/card-on-deck/' + this.state.gameId, this.callBack);//// move this so to be global
    //WebSocketService.subscribe('/user/topic/draw', this.onCardDrawResults);//// move this so to be global
  }
  componentWillUnmount() {
    console.log(this.state.cardProps);

    ContextBeanAware.remove(this);
    this.Refs = [];
    this.setState({ cardProps: null });

  }

  getCardProps = () => {
    return CashService.ownCardProps
  }

  setStateCardProps = () => {
    // return CashService.ownCardProps
    console.log("                                    setStateCardProps ");

    this.setState({ cardProps: this.getCardProps() });

  }
  // onCardDrawResults = (ws: any) => {
  //   let res = JSON.parse(ws.body)
  //   console.log("                             onCardDrawResults      ");
  //   this.setState({ cardProps: res });
  // }

  callBack = (messageOutput: any) => {
    //  console.log(messageOutput);
    let res = messageOutput?.body
    res = JSON.parse(res || {});
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
        break;
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
    console.log("own cards container  render  ");
    console.log(this.Refs);
    console.log(typeof this.Refs);
    let makeCards = (arg: any) => {

      if (!arg) {
        return (<div> </div>)
      }
      var indents = [];
      for (var i = 0; i < arg.length; i++) {
        let props = {
          cardId: arg[i]?.cardId,
          imgSrc: arg[i]?.imgSrc,
          opacity: 1
        }

        indents.push(
          ((i: number, props: CardProps) => {
            console.log(props);

            return (<div key={i} className="col-sm"  >
              <OwnCard   {...props} ref={(input) => { this.Refs[i] = input }} />
            </div>)
          })(i, props)
        );
      }
      return indents;
    }
    if (!!this.Refs[0]) {
      for (var i = 0; i < this.state.cardProps.length; i++) {
        this.Refs[i].setImage(this.state.cardProps[i]?.imgSrc)
      }
    }
    return (

      <div id="ownCardsContainer" className="row" >
        {makeCards(this.state.cardProps)}
      </div>
    );
  }
}

export default withRouter(OwnCardsContainer);
