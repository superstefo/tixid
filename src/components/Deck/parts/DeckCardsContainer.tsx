import React from "react";
import { withRouter } from "react-router-dom";
import { CardProps } from "./CardProps";
import CardsContainerI from "./CardsContainerI";
import PlayedCard from "./DeckCard";
import { RouteComponentProps } from 'react-router';
import ContextBeanAware from '../../../services/ContextBeanAware';
import CashService from '../../../services/CashService';

type Props = { beanId: string } & RouteComponentProps<{}>;

type State = {
  beanId: string,
  isVisible: boolean,
  cardProps: any

};

class DeckCardsContainer extends React.Component<Props, State> implements CardsContainerI {
  Refs: Array<any>
  constructor(props: Props) {
    super(props);
    this.state = {
      beanId: props.beanId,
      isVisible: true,
      cardProps: this.getCardProps()
    };
    this.Refs = [];
  }

  //@Override
  setStateCardProps = () => {
    this.setState({ cardProps: this.getCardProps() });
  }

  doVote = (cardId: string) => {
    console.log("vote for this card")
  }

  componentDidMount() {
    ContextBeanAware.add(this);
  }
  componentWillUnmount() {
    ContextBeanAware.remove(this)

    this.setState({ cardProps: null });
  }

  getCardProps = () => {
    return CashService.deckCardProps
  }
  render() {

    let makeCards = (arg: any) => {

      if (!arg) {
        return (<div> </div>)
      }
      var indents = [];
      for (var i = 0; i < arg.length; i++) {
        let props = {
          cardId: arg[i]?.cardId,
          imgSrc: arg[i]?.imgSrc,
          opacity: arg[i]?.opacity,
          key:    arg[i]?.cardId
        }

        indents.push(
          ((i: number, props: CardProps) => {
            return (
              <div key={i} className="col-sm">
                <PlayedCard  {...props} />
              </div>)
          })(i, props)
        );
      }
      return indents;
    }

    return (
      <div id="deckCardsContainer" className="row" >
        {makeCards(this.state.cardProps)}
      </div>
    );
  }
}

export default withRouter(DeckCardsContainer);
