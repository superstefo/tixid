import React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import Const from './Constants';
import CashService from './CashService';

class AjaxService extends React.Component {
  constructor(props: {}) {
    super(props);
    this.context = {};
  };
  execute = (method: AxiosRequestConfig["method"], url: string, data: object, headers: object) => {
    let arg: AxiosRequestConfig;
    arg = {};
    arg.method = method;
    arg.url = url;
    arg.data = data;
    arg.headers = headers;

    return axios(arg);
  };

  doPost = (url: string, data: object, headers: object) => {
    return this.execute('post', url, data, this.getHeaders(headers));
  };

  doPut = (url: string, data: object, headers: object) => {
    return this.execute('put', url, data, this.getHeaders(headers));
  };

  doGet = (url: string, headers: object) => {
    return this.execute('get', url, {}, this.getHeaders(headers));
  };

  doDelete = (url: string, headers: object) => {
    return this.execute('delete', url, {}, this.getHeaders(headers));
  };

  getHeaders = (headers: object) => {
    //   let authHeaderName = Const.AUTH_HEADER_NAME;
    //   let phoneHeaderName = Const.PHONE_HEADER_NAME;
    //   if (!headers) {
    //     headers = {};
    //   }

    //   if (CashService[phoneHeaderName]) {
    //     headers[phoneHeaderName] = CashService[phoneHeaderName];
    //   }

    //   if (CashService[authHeaderName]) {
    //     headers[authHeaderName] = CashService[authHeaderName];
    //   }
    return headers;
  };
}

export default new AjaxService({});