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

    // let props4 = {
    //   cardProps: {//
    //     beanId: "string",
    //    // opacity: 1,

    //     cardId: "",
    //     faceImgSrc: "string",
    //     isFaceShown: true
    //   }
    // }

    // const CardToken = (args: { cardProps: CardProps, id: number }) => {//  <Token {...args.cardProps} />
    //   return (
    //     <div className="rowd"  >

    //       <Card ref={(input) => { this.Refs[args.id] = input }} {...args.cardProps} />


    //     </div>
    //   );
    // }
    let props = {
      beanId: "string",
      //opacity: 1,
      cardId: "",
      imgShown: "string",
      //  backImgSrc: "",
      isFaceShown: true
    }

    var indents = [];
    for (var i = 0; i < 6; i++) {

      indents.push(((i: number) => {
        return (<div key={i} className="col-sm"  >
          <Card opacity={0}  {...props} ref={(input) => { this.Refs[i] = input }} />
        </div>)
      })(i)

      );
    }


    return (
      <div id="allCardsContainer" className="row">
        {indents}
      </div>
    );
  }
}

export default withRouter(AllCardsContainer);
