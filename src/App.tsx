import React from 'react';
import WebSocketService from './services/WebSocketService';
import Home from './components/Home';
import Header from './components/Header';
import Deck from './components/Deck/Deck';
//import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
document.body.classList.add('bg-success');
//document.body.stdyle = {'background': 'red;'};
const stylesObj = {
  background: "green"
};
WebSocketService.connect()
  let style = {
    stylesObj
  }
const App: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: 10 }}>

      <Router>
        <Header beanId="header1" />
        <Switch>
          
          < Route path="/deck" component={Deck} />
          < Route path="*" component={Home} />
        </Switch>
      </Router>
    </div >
  );
}

export default App;
// < Route path="*" component={Home} />
// < Route exact path="/" component={Home} />
// < Route path="/user" render={() => <UserView data={store} />} />
// < Route path="/phone" component={PhoneForm} />
// < Route path="/friend" component={OneFriend} />
// < Route path="/chat" render={() => <Chat beanId="chat1"/>} />
// < Route path="/notes" render={() => <Notes beanId="notes1"/>} />
// < Route path="/pals" render={() => <Friends data={store.updates} />} />
// < Route path="/more-pals" render={() => <MoreFriends data={store.updates} />} />
// < Route path="/pal-requests" render={() => <FriendRequests data={store.updates} />} />
// < Route path="/settings"render={() => <AppSettings beanId="appSettings1"/>} />
// < Route path="/confirm-token" component={ConfirmCode} />