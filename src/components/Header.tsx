import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import ContextBeanAware from '../services/ContextBeanAware';
import WebSocketService from '../services/WebSocketService';
import GameService from '../services/GameService';
//import CashService from '../services/CashService';
//import Const from '../services/Constants'
import AjaxService from '../services/AjaxService';
//import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

type Props = { beanId: string, history: any } & RouteComponentProps<{}>;

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
    let promise = GameService.createGame("user01");
    // promise.then((result) => {
    //   console.log(result);
    // })
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

  shuffle = () => {
    //ContextBeanAware.get
  }
  logout = () => {
    let promise = AjaxService.doPost('http://localhost:8585/logout', {}, {})

    promise.then((data) => {
      console.log(data);
      WebSocketService.disconnect()
    })
  }
  login = () => {
    let promise = AjaxService.doPost('http://localhost:8585/dologin?username=tester&password=a', {
      username: "tester",
      name: "tester",
      password: "a"
    }, {})

    promise.then((data) => {
      console.log(data);


      WebSocketService.connect()
    })
  }


  draw = () => {
    //ContextBeanAware.get

    let promise = AjaxService.doGet('http://localhost:8585/player/hand/' +  'gameId-000' , {    })

    promise.then((data) => {
      console.log(data);


    })
  }

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

    return (
      <nav>

        <div className="text-center">
          <div className="btn-group">
            <button type="button" onClick={this.login} className="btn btn-primary"> login </button>
            {this.state.isVisible ? <Btn to="/home" label="Home" /> : null}
            {this.state.isVisible ? <Btn to="/deck" label="Deck" /> : null}

            <button type="button" onClick={this.logout} className="btn btn-primary"> |-> </button>
            <button type="button" onClick={this.draw} className="btn btn-primary"> draw </button>
            <button type="button" onClick={this.shuffle} className="btn btn-primary"> Shuffle </button>
          </div>
          {this.state.isVisible ? <span className="float-right"> ver: </span> : null}
        </div>
      </nav>
    );
  }
}
let BtnBadge2 = (props: { data: {} }) => {
  let mtch = props.data;

  return (
    <div>
      <button onClick={() => { }} className="btn btn-primary" > New: </button>
    </div>
  )

}
export default withRouter(Header);

 //   {this.state.isVisible ? <span className="float-left"> {CashService.getPhone()} </span> : null}




