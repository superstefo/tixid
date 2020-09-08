import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService';
import WebSocketService from './WebSocketService'
import ContextBeanAware from './ContextBeanAware'
import CardsContainerI from "../components/Deck/parts/CardsContainerI";

class CashService extends React.Component {
  gameId: string
  bookmarks: Array<string>
  ownCardProps: any
  deckCardProps: any
  constructor(props: any) {
    super(props);

    this.bookmarks = [];
    //TODO: remove
    this.gameId = "gameId-000"
    this.ownCardProps = null
    this.deckCardProps = null
    this.init()
  };

  init = () => {
    WebSocketService.subscribe('/topic/' + this.gameId + '/deck/card', this.onCardPlacedOnDeckResults);
    WebSocketService.subscribe('/user/topic/hand', this.onCardDrawResults);
  }

  onCardPlacedOnDeckResults = (wsMsg: any) => {
    this.deckCardProps = JSON.parse(wsMsg.body);
    let DeckCardsContainer = ContextBeanAware.get("deckCardsContainer1") as CardsContainerI;

    if (!DeckCardsContainer) {
      return;
    }

    DeckCardsContainer.setStateCardProps();
  }

  onCardDrawResults = (wsMsg: any) => {
    this.ownCardProps = JSON.parse(wsMsg.body);
    let OwnCardsContainer = ContextBeanAware.get("ownCardsContainer1") as CardsContainerI;

    if (!OwnCardsContainer) {
      return;
    }
    OwnCardsContainer.setStateCardProps()
  }

  persistAll = function (phone: string, obj: string) {
  }

  loadAll = function (phone: string) {
    return AjaxService.doGet(Const.URLS.STORAGE + phone, {});
  }

  doPost = (url: string, data: object, headers: object) => {

    return this.persistAll('post', url);
  };

}

export default new CashService({});
