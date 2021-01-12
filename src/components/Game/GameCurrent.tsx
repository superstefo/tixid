import React from 'react';
import GameService from '../../services/GameService';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import "react-table/react-table.css";

type Props = { beanId: string } & RouteComponentProps<{}>;

interface IState {
  nameValue: string,
  gameSearchResults: Array<any>;
}

class Game extends React.Component<Props, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      nameValue: '',
      gameSearchResults: GameService.gameSearchResults
    };
  }

  createGame = () => {
  }

  seeGameInfo = (rowInfo: any) => {
    this.props.history.push({
      pathname: '/game-info',
      state: rowInfo
    })
  }

  render() {
    return (
      <div>
        <h5>Current Game:</h5>
        <h6>Score:</h6>
        <p />
        <button type="button" onClick={this.createGame} className="btn btn-primary"> Leave game! </button>
      </div >
    )
  }
}

export default withRouter(Game);


