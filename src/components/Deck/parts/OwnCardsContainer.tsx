import React from "react";
import { withRouter } from "react-router-dom";
import OwnCard from "./OwnCard";
import { CardProps } from "./CardProps";
import CardsContainerI from "./CardsContainerI";
import { RouteComponentProps } from 'react-router';
import ContextBeanAware from '../../../services/ContextBeanAware';
import CashService from '../../../services/CashService';

type Props = { beanId: string } & RouteComponentProps<{}>;

type State = {
  cardProps: any
};

class OwnCardsContainer extends React.Component<Props, State> implements CardsContainerI {

  beanId: string;

  constructor(props: Props) {
    super(props);
    this.state = {
      cardProps: this.getCardProps()
    };
    this.beanId = props.beanId;
  }

  componentDidMount() {
    ContextBeanAware.add(this);
  }

  componentWillUnmount() {
    ContextBeanAware.remove(this);
    this.setState({ cardProps: null });
  }

  getCardProps = () => {
    return CashService.ownCardProps
  }

  setStateCardProps = () => {
    this.setState({ cardProps: this.getCardProps() });
  }

  onCardDrawResults = (ws: any) => {
    let res = JSON.parse(ws.body)
    this.setState({ cardProps: res });
  }

  clickOnCard = (cardOnclickFunc: Function) => {
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
              <div key={i} className="col-sm"  >
                <OwnCard  {...props} />
              </div>)
          })(i, props)
        );
      }
      return indents;
    }

    return (

      <div id="ownCardsContainer3" className="row" >
        {makeCards(this.state.cardProps)}
      </div>
    );
  }
}

export default withRouter(OwnCardsContainer);
