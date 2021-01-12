import React from "react";
import AjaxService from "../../../services/AjaxService";
import { CardStateI, CardProps } from "./CardProps";
import CashService from '../../../services/CashService';
import Const from '../../../services/Constants';

class DeckCard extends React.Component<CardProps, CardStateI>{

  constructor(props: CardProps) {
    super(props);
    this.state = {
      opacity: props.opacity,
      cardId: props.cardId,
      imgSrc: props.imgSrc
    };
  }

  componentDidMount() {
  }

  changeState = (obj: any) => {
    this.setState(obj);
  }

  doVote = () => {
    let cardId = this.state.cardId;
    //TODO: constants
    let promise = AjaxService.doPost(Const.URL.BASE + CashService.gameId + "/voting/card/" + cardId, {}, {});
    promise.catch((error) => {
      console.error(error);
    });
  }

  render() {
    let cssClasses = 'opac float-left img-fluid rounded';
    return (
      <div id="playedCard" className="opac  float-botftom contaidner-fluid">
        <img onClick={this.doVote} alt="some image" style={{ opacity: this.state.opacity }} className={cssClasses}
          src={this.state.imgSrc} />
      </div>
    );
  }
}

export default DeckCard;
