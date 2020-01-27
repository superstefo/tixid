import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import AjaxService from "../../../services/AjaxService";
import { RouteComponentProps } from 'react-router';
import WebSocketService from '../../../services/WebSocketService';
import { log } from "util";



interface ICardState {
  opacity: number,
  cardId: string,
  faceImgSrc: string,
  isFaceShown: boolean
}

export type CardProps = { 
} & ICardState

class Card extends React.Component<CardProps, ICardState>{
  onClickFunc: any;

  constructor(props: CardProps) {
    super(props);
    this.state = {
    
      opacity: props.opacity,
      isFaceShown: props.isFaceShown,
  
      cardId: "card-001",
      faceImgSrc: "https://external-preview.redd.it/kD8uW-DXNIO55TnlWDtT8bqk1g6awTVbqF3MCTjCDTI.jpg?auto=webp&s=73dbc0703474e0b3b0300b1980b35d4538522c9c"
    };
    

  }


  componentDidMount() {///0886625452
    //  WebSocketService.subscribe('/topic/card-on-deck/"+ gameId', this.wrapper);
  }

  changeState = (obj: any) => {
    this.setState(obj);
  }

  onClick = () => {

    let gameId = "game-001"//this.state.gameId;
    let cardId = this.state.cardId;
    AjaxService.doPost("http://localhost:8585/card-on-deck/" + gameId + "/" + cardId, {}, {});
    return "stefko"
  }

  setInvisible = () => {
    this.setState({ opacity: 0 });
  }

  setImgSource = (faceImgSrc: string) => {
    this.setState({ faceImgSrc: faceImgSrc });
  }

  ///https://upload.wikimedia.org/wikipedia/commons/6/6a/India_tiger.jpg
  render() {
    let cssClasses = 'opac float-left img-fluid rounded';
    return (
      <div id="dd2" className="opac float-botftom contaidner-fluid">
        <img onClick={this.onClick} alt="some image" style={{ opacity: this.state.opacity }} className={cssClasses} 
          src={this.state.faceImgSrc}/>
      </div>
    );
  }
}

export default Card;
