import React from 'react';
//import Const from './Constants';
import AjaxService from './AjaxService';
import CashService from './CashService';

class GameService extends React.Component {
  constructor(props: {}) {
    super(props);
    this.context = {};
  };


  createGame = (userId: string) => {
    //return AjaxService.doPost("http://localhost:8585/game/"+userId, {}, {});
  };

 
}

export default new GameService({});