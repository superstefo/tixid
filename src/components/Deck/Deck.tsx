import React from "react";
import { withRouter } from "react-router-dom";
import OwnCardsContainer from "./parts/OwnCardsContainer";
import PlayedCardsContainer from "./parts/PlayedCardsContainer";
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

  componentDidMount() {

  
      // let gotoUrl = this.props.location.query.goto;
      //   if (gotoUrl) {
      //       // NOTE: this may have security implications; see below
      //       browserHistory.push(gotoUrl);
      //   }
    
    // BeanContextAware.add(this);
  }

  componentWillUnmount() {
    // BeanContextAware.remove(this);
  }

  render() {

    return (
      <div id="dd2" className="float-bottom text-center">

      
        <OwnCardsContainer beanId="own" />
      </div>
    );
  }
}

export default withRouter(Deck);
//  <PlayedCardsContainer beanId="all" />