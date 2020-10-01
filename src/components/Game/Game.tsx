import React from 'react';
import GameService from '../../services/GameService';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import { AxiosResponse } from 'axios';
import "react-table/react-table.css";

type Props = { beanId: string } & RouteComponentProps<{}>;

interface IState {
  nameValue: string,
  searchNameVal: string,
  gameSearchResults: Array<any>;
}

class Game extends React.Component<Props, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      nameValue: '',
      searchNameVal: '',
      gameSearchResults: GameService.gameSearchResults

    };
  }

  setStateGameSearchResults = () => {
    this.setState({ gameSearchResults: GameService.gameSearchResults });
  }

  onKeyPressCreate = (e: any) => {
    if (e.key !== 'Enter') {
      return;
    }
    this.createGame();
    this.setState({ nameValue: '' });
  }

  onChangeCreate = (e: any) => {
    var elem = e.srcElement || e.target;
    this.setState({ nameValue: elem.value })
  }

  onKeyPressSearch = (e: any) => {
    if (e.key !== 'Enter') {
      return;
    }
    this.createGame();
    this.setState({ searchNameVal: '' });
  }

  onChangeSearch = (e: any) => {
    var elem = e.srcElement || e.target;
    this.setState({ searchNameVal: elem.value })
  }

  createGame = () => {
    GameService.createGame(this.state.nameValue, false, 'en');
    //TODO: languages
  }

  searchGames = () => {
    let promise = GameService.searchGame(this.state.searchNameVal, false, 'en');
    promise.then((data: AxiosResponse<any>) => {
      GameService.gameSearchResults = data.data
      this.setStateGameSearchResults()
    }).catch((e) => {
      console.error(e);
    })

  }

  seeGameInfo = (rowInfo: any) => {
    this.props.history.push({
      pathname: '/game-info',
      state: rowInfo
    })
  }

  render() {
    let person = this.state.gameSearchResults || []

    let present = [
      {
        columns: [
          {
            Header: "Name",
            accessor: "name"
          },
          {
            Header: "Players in (6 max)",
            accessor: "players"
          },
          {
            Header: "Creator",
            accessor: "creator"
          },
          {
            Header: "Language",
            accessor: "lang"
          }
        ]
      }
    ]

    let inputProps = {
      placeholder: 'name...',
      value: this.state?.nameValue,
      onChange: this.onChangeCreate,
      onKeyPress: this.onKeyPressCreate
    }

    let srchInputProps = {
      placeholder: 'name...',
      value: this.state?.searchNameVal,
      onChange: this.onChangeSearch,
      onKeyPress: this.onKeyPressSearch
    }

    return (
      <div>
        <h5>Create game:</h5>
        <input {...inputProps} type="text" />
        <button type="button" onClick={this.createGame} className="btn btn-primary"> Go! </button>
        <p />
        <h5>Search game:</h5>
        <input {...srchInputProps} type="text" />
        <button type="button" onClick={this.searchGames} className="btn btn-primary"> Go! </button>
        <div>
          <div className="text-center p-1 ">
          </div>

          <div>
            <div>
              <ReactTable className="-striped -highlight"
                data={person}
                columns={present}
                sortable={true}
                defaultPageSize={5}
                showPagination={true}
                getTrProps={(state: any, rowInfo: any) => {
                  return {
                    onClick: (e: any) => {
                      this.seeGameInfo(rowInfo)
                    },
                  }
                }}
              />
              <br />
            </div>
          </div>
        </div>
      </div >
    )
  }
}





export default withRouter(Game);


