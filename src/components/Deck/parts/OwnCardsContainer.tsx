import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Card from "./Card";
import Separator from "./Separator";
import { RouteComponentProps } from 'react-router';

type Props = { beanId: string, history : any  } & RouteComponentProps<{}>;

type State = { 
    beanId: string,
    isVisible: boolean 
};

class OwnCardsContainer extends React.Component<Props, State>{
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


  startFlashTabTitle = () => {

  }

  render() {
    let props = {beanId:"ss"}
    return (
      <div id="ownCardsContainer" className="row" >
   
        <div className="col-sm"  > 
          <Card opacity={1}{...props}/>
        </div>
      
        <div className="col-sm" > 
          <Card opacity={1}{...props}/>
        </div>

        <div className="col-sm" > 
          <Card opacity={0}{...props}/>
        </div>

        <div className="col-sm" > 
         <Card opacity={1}{...props}/>
        </div>

        <div className="col-sm" > 
          <Card opacity={1}{...props}/>
        </div>

        <div className="col-sm"  > 
          <Card opacity={1}{...props}/>
        </div>
        </div> 
    );
  }
}

export default  withRouter(OwnCardsContainer);
