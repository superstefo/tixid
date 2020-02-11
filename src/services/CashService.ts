import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService';
import WebSocketService from './WebSocketService'
import ContextBeanAware from './ContextBeanAware'

//type Props = { beanId: string, history: any } //& RouteComponentProps<{}>;

// type State = {
//   beanId: string,
//   isVisible: boolean
// };
class CashService extends React.Component {
  gameId: string
  bookmarks: Array<string>
  ownCardProps: any
  constructor(props: any) {
    super(props);

    this.bookmarks = [];
    this.gameId = "gameId-000"
    this.ownCardProps = null
    this.init()
  };

  init = () => {

    // WebSocketService.subscribe('/topic/card-on-deck/' + this.gameId, this.callBack);//// move this so to be global
    WebSocketService.subscribe('/user/topic/draw', this.onCardDrawResults);//// move this so to be global
  }


  onCardDrawResults = (ws: any) => {
    this.ownCardProps = JSON.parse(ws.body);
    let ownCardsContainefr1 = ContextBeanAware.get("ownCardsContainer1");
    if (!ownCardsContainefr1) {
      return;
    }
    ownCardsContainefr1.setStateCardProps()
    //console.log(res);
    // this.setState({ cardProps: res });
  }

  persistAll = function (phone: string, obj: string) {
  }

  loadAll = function (phone: string) {
    return AjaxService.doGet(Const.URLS.STORAGE + phone, {});
  }

  doPost = (url: string, data: object, headers: object) => {

    return this.persistAll('post', url);
  };
  //   getPhone = () => {
  //     return this[Const.PHONE_HEADER_NAME];
  //   };

  //   setPhone = (phone) => {
  //     this[Const.PHONE_HEADER_NAME] = phone;
  //   };

  //   /// token:
  //   getToken = () => {
  //     return this[Const.AUTH_HEADER_NAME];
  //   };

  //   setToken = (token) => {
  //     this[Const.AUTH_HEADER_NAME] = token;
  //   };

  //   persistToken(token) {
  //     AjaxService.doPut(Const.URLS.STORAGE_TOKEN + this.getPhone(), {
  //       'json': JSON.stringify({ "token": token })
  //     });
  //   }

  //   //// settings:
  //   getSettings = () => {
  //     return this.settings;
  //   };

  //   setSettings = (settings) => {
  //     this.settings = settings;
  //   };

  //   persistSettings = (settings) => {
  //     AjaxService.doPut(Const.URLS.STORAGE_SETTINGS + this.getPhone(), {
  //       'json': JSON.stringify(settings)
  //     });
  //   }

  //   /// bookmarks:
  //   getBookmarks() {
  //     return this.bookmarks;
  //   }

  //   setBookmarks(bookmarks) {
  //     this.bookmarks = bookmarks;
  //   }

  //   getBookmarksAsObject() {
  //     return this.bookmarks.reduce((json, value, key) => {
  //       json[value] = key;
  //       return json;
  //     }, {});
  //   }

  //   persistBookmarks = function (arr) {
  //     let promise = AjaxService.doPost(Const.URLS.STORAGE_BOOKMARKS + this.getPhone(), {
  //       'json': JSON.stringify(arr)
  //     }, {});

  //     promise.then((data) => {
  //       console.log(data);
  //     }).catch((e) => {
  //       console.error(e);
  //     })
  //   }
}

export default new CashService({});
