import React from 'react';
import WebSocketService from './WebSocketService'
import ContextBeanAware from './ContextBeanAware'
import CardsContainerI from "../components/Deck/parts/CardsContainerI";

class CashService extends React.Component {
  gameId: string | null;
  bookmarks: Array<string>;
  ownCardProps: any;
  deckCardProps: any;
  constructor(props: any) {
    super(props);
    this.bookmarks = [];
    this.gameId = null;
    this.ownCardProps = null;
    this.deckCardProps = null;
  };


  subscribe = (id: string) => {
    this.gameId = id;
    WebSocketService.subscribe('/topic/' + this.gameId + '/msg', this.onMessage);
    WebSocketService.subscribe('/user/topic/' + this.gameId + '/msg', this.onMessage);
  }

  //       {
  //        "info": json,
  //        "deck": json,
  //        "hand": json,
  //       "warn": json,
  //       "clue": json,
  //    }
  onMessage = (wsMsg: any) => {
    let jsn = JSON.parse(wsMsg.body);
    if (!jsn)
      return;

    if (!!jsn.deck)
      this.onDeckCardsMessage(jsn.deck);
    if (!!jsn.hand)
      this.onHandCardsMessage(jsn.hand);
    if (!!jsn.info)
      this.informing(jsn.info);
    if (!!jsn.warn)
      this.informing(jsn.warn);
    if (!!jsn.clue)
      this.informing(jsn.clue);
  }

  informing = (info: any) => {
    console.log(" " + new Date() + info)
  }

  onDeckCardsMessage = (deck: any) => {
    this.deckCardProps = deck;
    let DeckCardsContainer = ContextBeanAware.get("deckCardsContainer1") as CardsContainerI;

    if (!DeckCardsContainer) {
      return;
    }
    DeckCardsContainer.setStateCardProps();
  }

  onHandCardsMessage = (hand: any) => {
    this.ownCardProps = hand;
    let OwnCardsContainer = ContextBeanAware.get("ownCardsContainer1") as CardsContainerI;

    if (!OwnCardsContainer) {
      return;
    }
    OwnCardsContainer.setStateCardProps()
  }
}

export default new CashService({});