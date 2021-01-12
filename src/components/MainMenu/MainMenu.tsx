import React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import Login from '../MainMenu/Login';
import GameSearch from '../Game/GameSearch';
import GameCurrent from '../Game/GameCurrent';
import GameHelp from '../Game/GameHelp';
import "react-table/react-table.css";

type Props = { beanId: string } & RouteComponentProps<{}>;

interface IState {
  view: any,
}

class MainMenu extends React.Component<Props, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      view: '',
    };
  }

  show = (view: string) => {
    if (view === '1') {
      this.setState({ view: <Login /> })
    } else if (view === '2') {
      this.setState({ view: <GameSearch beanId='GameSearch11' /> })
    } else if (view === '3') {
      this.setState({ view: <GameCurrent beanId='GameCurrent11' /> })
    } else {
      this.setState({ view: <GameHelp beanId='GameHelp11' /> })
    }
  }

  seeGameInfo = (rowInfo: any) => {
    this.props.history.push({
      pathname: '/game-info',
      state: rowInfo
    })
  }

  render() {
    let person = [{
      "create": <button type="button" onClick={() => { this.show("1") }} className="btn btn-primary"> Login </button>,
      "search": <button type="button" onClick={() => { this.show("2") }} className="btn btn-primary"> Search Games </button>,
      "info": <button type="button" onClick={() => { this.show("3") }} className="btn btn-primary"> This Game </button>,
      "help": <button type="button" onClick={() => { this.show("4") }} className="btn btn-primary"> Help </button>,
    }];

    let present = [
      {
        columns: [
          {
            Header: "_",
            accessor: "create"
          },
          {
            Header: "_",
            accessor: "search"
          },
          {
            Header: "_",
            accessor: "info"

          },
          {
            Header: "_",
            accessor: "help"
          }
        ]
      }
    ]
    const tableStyle = {
      border: "none",
      boxShadow: "none"
    };

    return (
      <div>
        <div>
          <ReactTable className=""
            data={person}
            style={tableStyle}
            columns={present}
            sortable={false}
            defaultPageSize={1}
            showPagination={false}
            TheadComponent={() => null}// hides the header
          />
          <br />
        </div>
        {this.state.view}
      </div >
    )
  }
}


export default withRouter(MainMenu);


