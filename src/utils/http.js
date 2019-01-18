import { Token } from 'token.js';
import config from '../config.js'

class Http {
  constructor() {
    "use strict";
    this.baseRestUrl = config.baseUrl;
  }
  request(params,noRefetch) {
    var self = this,
      url = this.baseRestUrl + params.url;
    if (!params.type) {
      params.type = 'post';
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'Authorization': wx.getStorageSync('token'),
        'Accept': this.accept,
      },
      success(res) {
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        } else {
          if (code == '401') {
            if (!noRefetch) {
              self._refetch(params);
            }
          }
          self._processError(res);
          params.eCallback && params.eCallback(res.data);
        }
      },
      fail: function (err) {
        self._processError(err);
      }
    })
  }
  _processError(err) {
    console.log(err);
  }
  _refetch(param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(param, true);
    });
  }
}

export { Http };