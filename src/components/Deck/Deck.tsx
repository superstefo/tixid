import React from "react";
import { withRouter } from "react-router-dom";
import OwnCardsContainer from "./parts/OwnCardsContainer";
import PlayedCardsContainer from "./parts/DeckCardsContainer";
import { RouteComponentProps } from 'react-router';

type Props = { beanId: string, history: any } & RouteComponentProps<{}>;

type State = {
  beanId: string,
  isVisible: boolean
};

class Deck extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

  }
  changeState = (obj: any) => {
    this.setState(obj);
  }

  changeButtonVisibility = (obj: any) => {
    this.setState(obj);
  }

  render() {

    return (
      <div id="dd2" className="float-bottom text-center">
        <PlayedCardsContainer beanId="deckCardsContainer1" />
        <OwnCardsContainer beanId="ownCardsContainer1" />
      </div>
    );
  }
}

export default withRouter(Deck);
//  <PlayedCardsContainer beanId="all" />