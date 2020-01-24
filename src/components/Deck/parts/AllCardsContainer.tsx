import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Card, {CardProps} from "./Card";
import Token, {TokenProps} from "./Token";
import { RouteComponentProps } from 'react-router';

type Props = { beanId: string  } & RouteComponentProps<{}>;

type State = { 
    beanId: string,
    isVisible: boolean 
};

class AllCardsContainer extends React.Component<Props, State>{
//   initialTitle: string;
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       beanId: props.beanId,
//       isVisible: true 

//     };
//     this.initialTitle = document.title;
//   }

  changeState = (obj: any) => {
    this.setState(obj);
  }

  doVote = (cardId: string) => {
    console.log("vote for this card")
  }

  render() {

    let props = {cardProps : {
      beanId: "string",
      opacity: 1,
      onClickFunc : ()=>{}
    }}

    const CardToken = (args: {cardProps: CardProps}) => {
      return (
      <div className="rowd"  > 

          <Card {...args.cardProps}/> 
          <Token {...args.cardProps}/>

      </div>
      );
    }

    return (
      <div id="allCardsContainer" className="row">
        <div className="col-sm"  > 
          <CardToken {...props}/>
        </div>

        <div className="col-sm"  > 
          <CardToken {...props}/>
        </div>

        <div className="col-sm"  > 
          <CardToken {...props}/>
        </div>

        <div className="col-sm"  > 
          <CardToken {...props}/>
        </div>

        <div className="col-sm"  > 
          <CardToken {...props}/>
        </div>

        <div className="col-sm"  > 
          <CardToken {...props}/>
        </div>

      </div>
    );
  }
}

export default withRouter(AllCardsContainer);
