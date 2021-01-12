import React from 'react';
import WebSocketService from '../../services/WebSocketService';
import AjaxService from '../../services/AjaxService';
import Const from '../../services/Constants';

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

    let promise = AjaxService.doPost(Const.URL.LOGIN, null, {
      pswd: "a", //TODO: remove
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
