import React from 'react';
import ContextBeanAware from '../../../../services/ContextBeanAware';
import CashService from '../../../../services/CashService';
import InputAndButton from './InputAndButton';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';

import logo from './genie.gif'

import "react-table/react-table.css";

type Props = { beanId: string } & RouteComponentProps<{}>;

interface IState {
  view: any
}

class Game extends React.Component<Props, IState> {

  constructor(props: any) {
    super(props);
    let info = this.getView();
    this.state = {
      view: info
    };
  }

  componentDidMount() {
    ContextBeanAware.add(this);
  }

  componentWillUnmount() {
    ContextBeanAware.remove(this);
  }

  setView = (view: any) => {
    this.setState({ view: view });
  }

  updateView = () => {
    this.setView(this.getView())
  }

  getView = () => {

    let text: String = "";
    CashService.infoScreen.forEach((one: any) => {
      if (!!one) {
        text = one
      }
    })
    return (
      <div>
        {text}
        <p />
        {!!CashService?.clue ? <label>"Clue: " {CashService.clue}</label> : ""}
        <p />
        {!!CashService?.currentPhase?.startsWith('Set Clue Phase') && !CashService?.clue ? <InputAndButton heading="Clue: " /> : ""}
      </div >
    );

  }

  render() {
    let data = [{
      "view": this.state.view,
      "gif":
        (
          <div className="container-fluid px-0">
            <img src={logo} alt="loading..." className='img-fluid w-100' />
          </div>
        )
    }];

    let present = [
      {
        columns: [
          {
            Header: "_",
            accessor: "view"
          },

          {
            Header: "_",
            accessor: "gif",
            maxWidth: 250
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
        <ReactTable className=""
          data={data}
          style={tableStyle}
          columns={present}
          sortable={false}
          defaultPageSize={1}
          showPagination={false}
          TheadComponent={() => null}
        />
      </div >
    )
  }
}

export default withRouter(Game);


