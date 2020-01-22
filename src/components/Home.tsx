import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <Link to="/deck">  deck</Link>
      </div >
    )}
  }

  export default Home;
