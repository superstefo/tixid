import React from 'react';
import Const from './Constants';
import AjaxService from './AjaxService';

//type Props = { beanId: string, history: any } //& RouteComponentProps<{}>;

// type State = {
//   beanId: string,
//   isVisible: boolean
// };
class CashService extends React.Component{

    bookmarks: Array<string>
  constructor(props: any) {
    super(props);

    this.bookmarks = [];

  };


  persistAll = function (phone: string, obj: string) {
  

  }

  loadAll = function (phone: string) {
    return AjaxService.doGet(Const.URLS.STORAGE + phone, {});
  }

  doPost = (url: string, data: object, headers: object) => {
      this.bookmarks
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
