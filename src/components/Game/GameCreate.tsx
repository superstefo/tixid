import React from 'react';
import GameService from '../../services/GameService';
import CashService from '../../services/CashService';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import "react-table/react-table.css";

type Props = { beanId: string } & RouteComponentProps<{}>;

interface IState {
  nameValue: string,
}

class Game extends React.Component<Props, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      nameValue: '',
    };
  }

  onKeyPressCreate = (e: any) => {
    if (e.key !== 'Enter') {
      return;
    }
    this.setState({ nameValue: '' });
  }

  onChangeCreate = (e: any) => {
    var elem = e.srcElement || e.target;
    this.setState({ nameValue: elem.value })
  }

  createGame = () => {
    let promise = GameService.createGame(this.state.nameValue, false, 'en');
    promise.then((data) => {
      CashService.subscribe(data.data[0].id);
      this.props.history.push({
        pathname: '/deck'
      })
    }).catch((e) => {
      console.error(e);
    })
  }

  render() {

    let inputProps = {
      placeholder: 'name...',
      value: this.state?.nameValue,
      onChange: this.onChangeCreate,
      onKeyPress: this.onKeyPressCreate
    }

    return (
      <div>
        <h5>Create game:</h5>
        <input {...inputProps} type="text" />
        <button type="button" onClick={this.createGame} className="btn btn-primary"> Go! </button>

      </div >
    )
  }
}


export default withRouter(Game);


