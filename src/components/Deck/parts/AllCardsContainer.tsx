import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Card, { CardProps } from "./Card";
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
class AllCardsContainer extends React.Component<Props, State>{
  Refs: Array<any>
  constructor(props: {}) {
    super(arg);
    this.state = {
      beanId: "AllCardsContainer1",
      isVisible: true,
   
      gameId: "game-001",
     // cardId: "card-002"
    };
    //  this.onClickFunc = props.onClickFunc;
    this.Refs = [];
  }

  changeState = (obj: any) => {
    this.setState(obj);
  }

  doVote = (cardId: string) => {
    console.log("vote for this card")
  }

  componentDidMount() {///0886625452
    ContextBeanAware.add(this)
   // WebSocketService.subscribe('/topic/card-on-deck/'+ this.state.gameId, this.callBack);
  }
  
  render() {

    let props = {
      cardProps: {
        beanId: "string",
        opacity: 1,
        onClickFunc: () => { }
      }
    }

    const CardToken = (args: { cardProps: CardProps, id: number }) => {//  <Token {...args.cardProps} />
      return (
        <div className="rowd"  >

          <Card ref={(input) => { this.Refs[args.id] = input }} {...args.cardProps} />
        

        </div>
      );
    }

    return (
      <div id="allCardsContainer" className="row">
        <div className="col-sm"  >
          <CardToken id={0} {...props} />
        </div>

        <div className="col-sm"  >
          <CardToken id={1} {...props} />
        </div>

        <div className="col-sm"  >
          <CardToken id={2} {...props} />
        </div>

        <div className="col-sm"  >
          <CardToken id={3} {...props} />
        </div>

        <div className="col-sm"  >
          <CardToken id={4} {...props} />
        </div>

        <div className="col-sm"  >
          <CardToken id={5} {...props} />
        </div>

      </div>
    );
  }
}

export default withRouter(AllCardsContainer);
