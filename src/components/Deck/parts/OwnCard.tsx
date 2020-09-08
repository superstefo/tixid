import React from "react";
import AjaxService from "../../../services/AjaxService";
import CashService from '../../../services/CashService';
import { log } from "util";
import {CardStateI, CardProps } from "./CardProps";


class OwnCard extends React.Component<CardProps, CardStateI> {
  isEnabled: boolean;

  constructor(props: CardProps) {
    super(props);

    this.state = {
      opacity: props.opacity,
      cardId: props.cardId,
      imgSrc: props.imgSrc
    };
    this.isEnabled = true;
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  //TODO: remove this method; heavy operations
  static getDerivedStateFromProps(newProps: any, currentState: any) {
    if (currentState.opacity !== newProps.opacity) {
      return {
        opacity: newProps.opacity,
        imgSrc: newProps.imgSrc,
      }
    }
    return null
  }

  changeState = (obj: any) => {
    this.setState(obj);
  }
  setImage = (imgSrc: string) => {
    this.setState({ imgSrc: imgSrc });
  }

  setOpacity = (opacity: number) => {
    this.setState({ opacity: opacity });
  }

  placeCardOnDeck = () => {
    if (!this.isEnabled) {
      return;
    }
    let cardId = this.state.cardId;

    let promise = AjaxService.doPost("http://localhost:8585/" + CashService.gameId + "/deck/card/" + cardId, {}, {});
    this.isEnabled = false;

    promise.catch((error) => {
      console.error(error);
      this.isEnabled = true;

    });
  }


  render() {
    let cssClasses = 'opac float-left img-fluid rounded';
    return (
      <div id="dd2" className="opac float-botftom contaidner-fluid">
        <img onClick={this.placeCardOnDeck} alt="some image" style={{ opacity: this.state.opacity }} className={cssClasses}
          src={this.state.imgSrc} />
      </div>
    );
  }
}

export default OwnCard;
