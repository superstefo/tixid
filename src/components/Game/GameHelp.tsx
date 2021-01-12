import React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

type Props = { beanId: string } & RouteComponentProps<{}>;

interface IState {
}

class Game extends React.Component<Props, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <div>
        <h5>Game help game:</h5>
      Lorem ispum... sdfs fsd fs dfs sdfs fs sdfs sdfs fsd fs dfsfs fsd, fs dfs sdfs fsd f sdfs fsd fs dfs sdfs fsd fs dfss dfs.
      Tfs fsd fs dfs sdfs fs sdfs sdfs fsd fs dfsfs fsd, fs dfs sdfs fsd f sdfs fsd fs dfs sdfs fsd fs dfss dfs.
      </div >
    )
  }
}

export default withRouter(Game);


