import React from 'react';
import GameService from '../../services/GameService';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";

type Props = { beanId: string } & RouteComponentProps<{}>;

interface IState {
}

class GameInfo extends React.Component<Props, IState> {
  data: any;
  constructor(props: any) {
    super(props);
    this.data = [props.location.state.original] || [];
  }

  joinGame = () => {
    GameService.joinGame(this.data[0].id);
  }

  render() {
    let present = [
      {
        columns: [
          {
            Header: "Players: " + this.data[0].players,
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

    return (
      <div>
        <h5>Join game: {this.data[0].name}</h5>
        <div className="text-center">
          <ReactTable className="-striped -highlight"
            data={this.data}
            columns={present}
            sortable={false}
            defaultPageSize={1}
            showPagination={false}
          />
          <br />
        </div>
        <button type="button" onClick={this.joinGame} className="btn btn-primary"> Go! </button>
      </div >
    )
  }
}

export default withRouter(GameInfo);


