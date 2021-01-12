import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import WebSocketService from '../services/WebSocketService';
import ContextBeanAware from '../services/ContextBeanAware';
import CashService from '../services/CashService';
import AjaxService from '../services/AjaxService';
import { RouteComponentProps } from 'react-router';
import Const from '../services/Constants';

type Props = { beanId: string, history: any } & RouteComponentProps<{}>;

type State = {
  beanId: string,
  isVisible: boolean,
  isConfirmButtonVisible: boolean
};
class Header extends React.Component<Props, State>{

  initialTitle: string;
  isConfirmButtonVisibleTimeout: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      beanId: props.beanId,
      isVisible: true,
      isConfirmButtonVisible: false

    };
    this.initialTitle = document.title;
    this.isConfirmButtonVisibleTimeout = null
  }

  componentDidMount() {
    ContextBeanAware.add(this);
  }

  componentWillUnmount() {
    ContextBeanAware.remove(this);
  }
  changeState = (obj: any) => {
    this.setState(obj);
  }

  changeButtonVisibility = (obj: any) => {
    this.setState(obj);
  }

  nextPhase = () => {
    let promise = AjaxService.doPost(Const.URL.BASE + CashService.gameId + '/next-phase', {}, {});

    promise.then((data) => {
    }).catch((e) => {
      console.error(e);
    })
  }

  confirmNextPhase = () => {
    this.setState({ isConfirmButtonVisible: false });
    let promise = AjaxService.doPost(Const.URL.BASE + CashService.gameId + '/confirm-next-phase', {}, {});

    promise.then(() => {
    }).catch((e) => {
      console.error(e);
    })
  }

  setConfirmButtonVisible = () => {
    if (this.isConfirmButtonVisibleTimeout != null) {
      return;
    }

    let service = this;

    service.setState({ isConfirmButtonVisible: true });

    this.isConfirmButtonVisibleTimeout = window.setTimeout(function () {
      service.setState({ isConfirmButtonVisible: false });
      window.clearTimeout(service.isConfirmButtonVisibleTimeout);
      service.isConfirmButtonVisibleTimeout = null;

    }, 5000);
  }

  unsubscribe = () => {
    WebSocketService.unsubscribe()
  }

  exit = () => {
    let promise = AjaxService.doGet(Const.URL.GAME + CashService.gameId + '/session', {});
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
            {this.state.isVisible ? <Btn to="/main" label="🏠 🌍 👋📑" /> : null}
            {this.state.isVisible ? <Btn to="/game" label="Game" /> : null}
            {this.state.isVisible ? <Btn to="/deck" label="Deck" /> : null}

            {this.state.isConfirmButtonVisible
              ?
              <button type="button" onClick={this.confirmNextPhase} className="btn btn-primary"> DO NEXT </button>
              :
              <button type="button" onClick={this.nextPhase} className="btn btn-primary"> NEXT </button>}


       
            <button type="button" onClick={this.unsubscribe} className="btn btn-primary"> unsubscribe </button>
            <button type="button" onClick={this.exit} className="btn btn-primary"> exit  </button>
          </div>
          {this.state.isVisible ? <span className="float-right"> ver: </span> : null}
        </div>
      </nav>
    );
  }
}
export default withRouter(Header);

