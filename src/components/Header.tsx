import React from "react";
import { NavLink, withRouter } from "react-router-dom";
//import BeanContextAware from '../services/BeanContextAware';
//import CashService from '../services/CashService';
//import Const from '../services/Constants'
//import MatchDecoratorService from '../services/MatchDecoratorService';
//import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

type Props = { beanId: string, history : any  } & RouteComponentProps<{}>;

type State = { 
    beanId: string,
    isVisible: boolean 
};
class Header extends React.Component<Props, State>{
  initialTitle: string;
  constructor(props: Props) {
    super(props);
    this.state = {
      beanId: props.beanId,
      isVisible: true 

    };
    this.initialTitle = document.title;
  }

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


  startFlashTabTitle = () => {
    // this.flashIntervalObj = setInterval(
    //   () => {
    //     if (this.initialTitle === document.title) {
    //       document.title = "(" + this.state.msgMatches.length + ") " + this.initialTitle;
    //     } else {
    //       document.title = this.initialTitle;
    //     }
    //   }, 1000
    // );
  }


//   goChat = (match) => {
//     this.props.history.push({
//       pathname: '/chat',
//       state: { data: match }
//     })
//   }

  render() {
    let Btn = (props: any) => (
      <div>
        <NavLink activeClassName="active" to={props.to}>
          <button type="button" className="btn btn-primary">
            {props.label}
          </button>
        </NavLink>
      </div>
    )
    let isVisibleNewMsgs = true ? true : false;

    let BtnBadge = (props: any) => {
      let mtch = props.data;

        return (
          <div>
            <button onClick={() => { }} className="btn btn-primary" > New: </button>
          </div>
        )

      }

    return (
      <nav>
        <div className="text-center">
          <div className="btn-group">
            {this.state.isVisible ? <Btn to="/home" label="Home" /> : null}
            {this.state.isVisible ? <Btn to="/deck" label="Deck" /> : null}
            {this.state.isVisible ? <Btn to="/logout" label="|->" /> : null}
        
          </div>
          {this.state.isVisible ? <span className="float-right"> ver: </span> : null}
        </div>
      </nav>
    );
  }
}
let BtnBadge2 = (props: {data:{}}) => {
    let mtch = props.data;

      return (
        <div>
          <button onClick={() => { }} className="btn btn-primary" > New: </button>
        </div>
      )
   
    }
export default withRouter(Header);

 //   {this.state.isVisible ? <span className="float-left"> {CashService.getPhone()} </span> : null}