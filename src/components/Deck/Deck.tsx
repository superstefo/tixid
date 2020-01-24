import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import OwnCardsContainer from "./parts/OwnCardsContainer";
import AllCardsContainer from "./parts/AllCardsContainer";
import { RouteComponentProps } from 'react-router';

type Props = { beanId: string, history : any  } & RouteComponentProps<{}>;

type State = { 
    beanId: string,
    isVisible: boolean 
};

class Deck extends React.Component<Props, State>{
//     initialTitle: string;
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


  changeButtonVisibility = (obj: any) => {
    this.setState(obj);
  }

  componentDidMount() {
   // BeanContextAware.add(this);
  }

  componentWillUnmount() {
   // BeanContextAware.remove(this);
  }




  render() {


    return (
      <div id="dd2" className="float-bottom text-center">

          <AllCardsContainer beanId="all"/>
          <OwnCardsContainer beanId="own"/>  

      </div>
    );
  }
}

export default  withRouter(Deck);
//<OwnCardsContainer beanId="own"/>  