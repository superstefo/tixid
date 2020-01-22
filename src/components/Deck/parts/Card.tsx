import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import { RouteComponentProps } from 'react-router';

export type CardProps = { beanId: string, opacity: number };

interface ICardState {
  opacity: number,
  beanId: string
}

class Card extends React.Component<CardProps, ICardState>{
 // opacity: number;
  constructor(props: CardProps) {
    super(props);
    this.state = {
      beanId: props.beanId,
      opacity: props.opacity
    };
   // this.opacity = props.opacity;
  }

//   .item {   
//     height:200px;
//     width:200px;
//     background:red;
//     -webkit-transition: opacity 1s ease-in-out;
    
// }

// .item:hover {
//     opacity: 0;
// }


  changeState = (obj: any) => {
    this.setState(obj);
  }

  startFlashTabTitle = () => {
  }

  render() {
    let cssClasses = 'float-left img-fluid rounded';
    return (
        <div id="dd2" className="float-botftom contaidner-fluid">
          <img alt="some image" style={{ marginRight: 0,  marginTop: 0, opacity: this.state.opacity }}  className={cssClasses} src="https://external-preview.redd.it/kD8uW-DXNIO55TnlWDtT8bqk1g6awTVbqF3MCTjCDTI.jpg?auto=webp&s=73dbc0703474e0b3b0300b1980b35d4538522c9c" />
        </div>
    );
  }
}

export default Card;
