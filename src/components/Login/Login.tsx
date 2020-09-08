import React from 'react';
import { Link } from 'react-router-dom';

import WebSocketService from '../../services/WebSocketService';
import GameService from '../../services/GameService';
//import CashService from '../services/CashService';
import Const from '../../services/Constants';
import AjaxService from '../../services/AjaxService';

interface ILoginState {
  nameValue: string
}

class Login extends React.Component<{}, ILoginState> {
  constructor(props: any) {
    super(props);

    this.state = {
      nameValue: ''
    };
  }

  componentDidMount() {
  }

  onKeyPress = (e: any) => {
    if (e.key !== 'Enter') {
      return;
    }
    this.dologin();
    this.setState({ nameValue: '' });
  }

  onChange = (e: any) => {
    var elem = e.srcElement || e.target;
    this.setState({ nameValue: elem.value })
  }

  dologin = () => {
    console.log(this.state.nameValue);

    let promise = AjaxService.doPost('http://localhost:8585/login', {},
      {
        pswd: "a",
        usrnm: this.state?.nameValue
      })
    this.setState({ nameValue: '' });
    promise.then((data) => {
      WebSocketService.connect()
    })
  }

  render() {
    let inputProps = {
      placeholder: 'name...',
      value: this.state?.nameValue,
      onChange: this.onChange,
      //    className: this.getStyles(),
      onKeyPress: this.onKeyPress
    }
    return (
      <div>
        <h1>Welcome</h1>
        <input {...inputProps} type="text" />
        <button type="button" onClick={this.dologin} className="btn btn-primary"> login </button>
      </div >
    )
  }
}

export default Login;
