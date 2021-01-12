import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import Deck from './components/Deck/Deck';
import Game from './components/Game/Game';
import GameInfo from './components/Game/GameInfo';
import MainMenu from './components/MainMenu/MainMenu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

document.body.classList.add('bg-success');

const App: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: 10 }}>
      <Router basename={'/'}>
        <Header beanId="header1" />
        <Switch>
          < Route path="/main" component={MainMenu} />
          < Route path="/game" component={Game} />
          < Route path="/game-info" component={GameInfo} />
          < Route path="/deck" component={Deck} />
          < Route path="*" component={Home} />
        </Switch>
      </Router>
    </div >
  );
}

export default App;