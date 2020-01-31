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
  //isFaceShown: boolean
}

export type CardProps = {
} & ICardState

class OwnCard extends React.Component<CardProps, ICardState>{
  faceImgSrc: string;
  isEnabled: boolean;
  //  backImgSrc: string;
  constructor(props: CardProps) {
    super(props);
    this.state = {

      opacity: props.opacity,
    //  isFaceShown: props.isFaceShown,

      cardId: "card-001",
      imgShown: ""

    };
    this.isEnabled = true;
    this.faceImgSrc = "https://external-preview.redd.it/kD8uW-DXNIO55TnlWDtT8bqk1g6awTVbqF3MCTjCDTI.jpg?auto=webp&s=73dbc0703474e0b3b0300b1980b35d4538522c9c";
    //  this.backImgSrc = "https://scontent.fsof3-1.fna.fbcdn.net/v/t1.0-9/83337759_2543082952614427_8337201708232867840_n.jpg?_nc_cat=111&_nc_oc=AQnFAWe0qlMbGMaqQtNRN-LhN8IQaaMRjJJRvAGAhyDFo9eDp40m8drIVlfA42Hu2aw&_nc_ht=scontent.fsof3-1.fna&oh=fd9520b29a4207aae076a486a8456d4c&oe=5ED18B57"
  }

  // turnFaceUp=() => {
  //   this.setState({isFaceShown : true, imgShown : this.backImgSrc, opacity: 1});
  // }


  componentDidMount() {///0886625452
    //  WebSocketService.subscribe('/topic/card-on-deck/"+ gameId', this.wrapper);
  }

  changeState = (obj: any) => {
    this.setState(obj);
  }

  onClick = () => {
    if (!this.isEnabled) {
      return;
    }
    let gameId = "game-001"//this.state.gameId;
    let cardId = this.state.cardId;
    
    let promise = AjaxService.doPost("http://localhost:8585/hand/card/" + gameId + "/" + cardId, {}, {});
    this.isEnabled = false;
    this.setInvisible()
    // disable all cards for this round
    promise.catch((error) => {
      console.error(error);
      // enable all cards for this round
      this.isEnabled = true;
    });
  }

  setInvisible = () => {
    this.setState({ opacity: 0 });
  }

  setImgSource = (faceImgSrc: string) => {
    this.setState({ imgShown: faceImgSrc });
  }

  ///https://upload.wikimedia.org/wikipedia/commons/6/6a/India_tiger.jpg
  render() {
    let cssClasses = 'opac float-left img-fluid rounded';
    return (
      <div id="dd2" className="opac float-botftom contaidner-fluid">
        <img onClick={this.onClick} alt="some image" style={{ opacity: this.state.opacity }} className={cssClasses}
          src={this.faceImgSrc} />
      </div>
    );
  }
}

export default OwnCard;
