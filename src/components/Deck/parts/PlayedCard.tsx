import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import AjaxService from "../../../services/AjaxService";
import { RouteComponentProps } from 'react-router';
import WebSocketService from '../../../services/WebSocketService';
import { log } from "util";

interface ICardState {
  opacity: number,
  cardId: string,
  imgShown: string,
  isFaceShown: boolean
}

export type PlayedCardProps = {
} & ICardState

class PlayedCard extends React.Component<PlayedCardProps, ICardState>{
  faceImgSrc: string;
  backImgSrc: string;
  isEnabled: boolean;
  constructor(props: PlayedCardProps) {
    super(props);
    this.isEnabled = true;
    this.faceImgSrc = "https://external-preview.redd.it/kD8uW-DXNIO55TnlWDtT8bqk1g6awTVbqF3MCTjCDTI.jpg?auto=webp&s=73dbc0703474e0b3b0300b1980b35d4538522c9c";
    this.backImgSrc = "https://scontent.fsof3-1.fna.fbcdn.net/v/t1.0-9/83337759_2543082952614427_8337201708232867840_n.jpg?_nc_cat=111&_nc_oc=AQnFAWe0qlMbGMaqQtNRN-LhN8IQaaMRjJJRvAGAhyDFo9eDp40m8drIVlfA42Hu2aw&_nc_ht=scontent.fsof3-1.fna&oh=fd9520b29a4207aae076a486a8456d4c&oe=5ED18B57"
    this.state = {
      opacity: props.opacity,
      isFaceShown: props.isFaceShown,
      cardId: "card-001",
      imgShown: this.backImgSrc
    };
  }

  turnFaceUp = () => {
    this.setState({ isFaceShown: true, imgShown: this.faceImgSrc, opacity: 1 });
  }

  placeCardOnDeck=() => {
    this.setState({isFaceShown : true, imgShown : this.backImgSrc, opacity: 1});
  }

  componentDidMount() {
  }

  changeState = (obj: any) => {
    this.setState(obj);
  }

  doVote = () => {
    if (!this.isEnabled) {
      return;
    }
    let gameId = "game-001"//this.state.gameId;
    let cardId = this.state.cardId;
    let promise = AjaxService.doPost("http://localhost:8585/deck/card/" + gameId + "/" + cardId, {}, {});
    this.isEnabled = false;
    promise.catch((error) => {
      console.error(error);
      this.isEnabled = true;
    });
  }

  // setImgSource = (faceImgSrc: string) => {
  //   this.setState({ imgShown: faceImgSrc });
  // }

  ///https://upload.wikimedia.org/wikipedia/commons/6/6a/India_tiger.jpg
  render() {
    let cssClasses = 'opac float-left img-fluid rounded';
    return (
      <div id="playedCard" className="opac">
        <img onClick={this.doVote} alt="some image" style={{ opacity: this.state.opacity }} className={cssClasses}
          src={this.state.imgShown} />
      </div>
    );
  }
}

export default PlayedCard;
