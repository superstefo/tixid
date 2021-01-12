import React from 'react';
import AjaxService from './AjaxService';
import CashService from '../services/CashService';
import Const from '../services/Constants';

class GameService extends React.Component {
  gameSearchResults: Array<any>;
  constructor(props: {}) {
    super(props);
    this.gameSearchResults = [];
  };

  createGame = (name: string, hidden: boolean, lang: String) => {
    return AjaxService.doPost(Const.URL.GAME, {
      'name': name,
      'hidden': hidden,
      'lang': lang
    }, {});

  };

  searchGame = (name: string, hidden: boolean, lang: String) => {
    //TODO: refactor parameters:
    return AjaxService.doGet(Const.URL.GAMES + '?name=' + name + '&hidden=' + hidden + '&lang=' + lang, {});
  };

  joinGame = (id: string) => {
    CashService.subscribe(id);
  };

}

export default new GameService({});