import React from 'react';
import GameService from '../../services/GameService';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import { AxiosResponse } from 'axios';
import "react-table/react-table.css";

type Props = { beanId: string } & RouteComponentProps<{}>;

interface IState {
  searchNameVal: string,
  gameSearchResults: Array<any>;
}

class Game extends React.Component<Props, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      searchNameVal: '',
      gameSearchResults: GameService?.gameSearchResults || []

    };
  }

  setStateGameSearchResults = () => {
    let res = GameService.gameSearchResults || []
    this.setState({ gameSearchResults: res });
  }

  onKeyPressSearch = (e: any) => {
    if (e.key !== 'Enter') {
      return;
    }

    this.setState({ searchNameVal: '' });
  }

  onChangeSearch = (e: any) => {
    var elem = e.srcElement || e.target;
    this.setState({ searchNameVal: elem.value })
  }


  searchGames = () => {
    let promise = GameService.searchGame(this.state.searchNameVal, false, 'en');
    promise.then((data: AxiosResponse<any>) => {
      GameService.gameSearchResults = data.data;
      this.setStateGameSearchResults();
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
    let tableData = this.state.gameSearchResults || []

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

    let srchInputProps = {
      placeholder: 'name...',
      value: this.state?.searchNameVal,
      onChange: this.onChangeSearch,
      onKeyPress: this.onKeyPressSearch
    };

    const tableStyle = {
      border: "none",
      boxShadow: "none"
    };

    return (
      <div>
        <h5>Search game:</h5>
        <input {...srchInputProps} type="text" />
        <button type="button" onClick={this.searchGames} className="btn btn-primary"> Go! </button>
        <ReactTable className="-striped -highlight"
          data={tableData}
          columns={present}
          sortable={true}
          defaultPageSize={5}
          style={tableStyle}

          getTrProps={(state: any, rowInfo: any) => {
            return {
              onClick: (e: any) => {
                this.seeGameInfo(rowInfo)
              },
            }
          }}
        />
        <br />
      </div >
    )
  }
}

export default withRouter(Game);

