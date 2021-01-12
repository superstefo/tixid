import React from 'react';
import WebSocketService from './WebSocketService';
import Lang from './Languages';
import ContextBeanAware from './ContextBeanAware'
import CardsContainerI from "../components/Deck/parts/CardsContainerI";

class CashService extends React.Component {
  gameId: string | null;
  language: string | null;
  infoScreen: Array<any>;
  ownCardProps: any;
  deckCardProps: any;
  currentPhase: string | null;
  clue: string | null;
  constructor(props: any) {
    super(props);
    this.infoScreen = [];
    this.gameId = null;
    this.ownCardProps = null;
    this.deckCardProps = null;
    this.currentPhase = null;
    this.language = null;
    this.clue = null;
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
    console.log(wsMsg);

    let jsn = JSON.parse(wsMsg.body);
    if (!jsn)
      return;

    if (!!jsn.deck)
      this.onDeckCardsMessage(jsn.deck);
    if (!!jsn.hand)
      this.onHandCardsMessage(jsn.hand);
    if (!!jsn.info)
      this.onInfoMessage(jsn.info);
    if (!!jsn.warn)
      this.onWarnMessage(jsn.warn);
    if (!!jsn.clue)
      this.onClueMessage(jsn.clue);
  }

  setPhaseAndCode = (phase: string, code: number) => {
    this.currentPhase = phase// + "-" + code
  }

  onClueMessage = (clue: any) => {
    //  this.infoScreen.push(info);
    console.log("================================== clue =========================================");
    console.log(clue);

    this.setPhaseAndCode(clue.phase, clue.code)
    if (clue.code === 255) {
      this.setClue(clue);
    }
    this.updateInfoPanel();
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
    OwnCardsContainer.setStateCardProps();
  }

  onInfoMessage = (info: any) => {
    console.log("================================== on info Message=========================================");
    console.log(info);
    let text = this.getTextForLanguage(info);
    this.addToInfoScreen(text);
    this.setPhaseAndCode(info.phase, info.code)
    this.updateInfoPanel();
  }

  onWarnMessage = (warn: any) => {
    console.info("===================== on Warn Message =========================");
    console.info(warn);
    let text = this.getTextForLanguage(warn);
    this.addToInfoScreen(text)
    this.setPhaseAndCode(warn.phase, warn.code)
    this.setConfirmButtonVisible(warn.code);
    this.updateInfoPanel();

  }

  getTextForLanguage = (message: any) => {
    console.info("===================== get Text For Language =========================");
    let language = this.language || "EN"
    let text = (Lang as any)[message.code][language];

    return text;
  }

  addToInfoScreen = (text: any) => {
    console.log(text);

    this.infoScreen.push(text);
    //TODO: implement animation start trigger
  }


  setConfirmButtonVisible = (code: number) => {
    // the codes are to confirm if a phase has to be finished manually
    let allowedCodes = [47, 413, 433, 483]
    if (allowedCodes.indexOf(code) == -1) {
      return
    }
    let header1 = ContextBeanAware.get("header1");

    if (!header1) {
      return;
    }

    header1.setConfirmButtonVisible();
  }

  setClue = (clue: any) => {
    this.clue = clue?.text || '';
  }

  updateInfoPanel = () => {
    let InfoPanel1 = ContextBeanAware.get("InfoPanel1");
    if (!InfoPanel1) {
      return;
    }

    InfoPanel1.updateView()
  }
}

export default new CashService({});