import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import OwnCard, { CardProps } from "./OwnCard";
import PlayedCard, { PlayedCardProps } from "./PlayedCard";
import Token, { TokenProps } from "./Token";
import { RouteComponentProps } from 'react-router';
import ContextBeanAware from '../../../services/ContextBeanAware';

type Props = { beanId: string } & RouteComponentProps<{}>;

type State = {
  beanId: string,
  isVisible: boolean,
  gameId: string,
  //  cardId: string
};

let arg: Props;
class PlayedCardsContainer extends React.Component<Props, State>{
  Refs: Array<any>
  constructor(props: {}) {
    super(arg);
    this.state = {
      beanId: "PlayedCardsContainer1",
      isVisible: true,
      gameId: "game-001"
    };

    this.Refs = [];
  }

  changeState = (obj: any) => {
    this.setState(obj);
  }

  doVote = (cardId: string) => {
    console.log("vote for this card")
  }

  componentDidMount() {
    ContextBeanAware.add(this);
  }

  render() {
    let props = {
      beanId: "string",
      //opacity: 1,
      cardId: "",
      imgShown: "string",
      isFaceShown: false
    }

    var indents = [];
    for (var i = 0; i < 6; i++) {
      indents.push(((i: number) => {
        return (<div key={i} className="col-sm"  >
          <PlayedCard opacity={0}  {...props} ref={(input) => { this.Refs[i] = input }} />
        </div>)
      })(i)
      );
    }

    return (
      <div id="PlayedCardsContainer" className="row">
        {indents}
      </div>
    );
  }
}

export default withRouter(PlayedCardsContainer);
