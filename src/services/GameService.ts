import React from 'react';
import AjaxService from './AjaxService';
import CashService from '../services/CashService';

class GameService extends React.Component {
  gameSearchResults: Array<any>;
  constructor(props: {}) {
    super(props);
    this.gameSearchResults = [];
  };

  createGame = (name: string, hidden: boolean, lang: String) => {
    let promise = AjaxService.doPost('http://localhost:8585/game', {
      'name': name,
      'hidden': hidden,
      'lang': lang
    }, {});
    promise.then((data) => {

    }).catch((e) => {
      console.error(e);
    })
  };

  searchGame = (name: string, hidden: boolean, lang: String) => {
    return AjaxService.doGet('http://localhost:8585/games?name=' + name + '&hidden=' + hidden + '&lang=' + lang, {});
  };

  joinGame = (id: string) => {
    CashService.subscribe(id);
  };

}

export default new GameService({});