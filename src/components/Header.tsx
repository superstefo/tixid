import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import WebSocketService from '../services/WebSocketService';
import CashService from '../services/CashService';
import AjaxService from '../services/AjaxService';
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

  setClue = function (json: any) {
    let clue = { "clue": "testing CLUE to be set" }
    let promise = AjaxService.doPost('http://localhost:8585/' + CashService.gameId + '/clue', {
      'json': JSON.stringify(clue)
    }, {});

    promise.then((data) => {
      console.log(data);
    }).catch((e) => {
      console.error(e);
    })
  }

  nextPhase = () => {
    let promise = AjaxService.doPost('http://localhost:8585/' + CashService.gameId + '/next-phase', {}, {});

    promise.then((data) => {
      console.log(data);
    }).catch((e) => {
      console.error(e);
    })

  }

  doNextPhase = () => {
    let promise = AjaxService.doPost('http://localhost:8585/' + CashService.gameId + '/confirm-next-phase', {}, {});

    promise.then((data) => {
      console.log(data);
    }).catch((e) => {
      console.error(e);
    })
  }

  logout = () => {
    let promise = AjaxService.doPost('http://localhost:8585/logout', {}, {})

    promise.then((data) => {
      console.log(data);
      WebSocketService.disconnect()
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
            {this.state.isVisible ? <Btn to="/login" label="Log in" /> : null}
            {this.state.isVisible ? <Btn to="/game" label="Game" /> : null}
            {this.state.isVisible ? <Btn to="/deck" label="Deck" /> : null}
            <button type="button" onClick={this.nextPhase} className="btn btn-primary"> NEXT </button>
            <button type="button" onClick={this.doNextPhase} className="btn btn-primary"> DO NEXT </button>
            <button type="button" onClick={this.setClue} className="btn btn-primary"> set clue </button>
          </div>
          {this.state.isVisible ? <span className="float-right"> ver: </span> : null}
        </div>
      </nav>
    );
  }
}
export default withRouter(Header);