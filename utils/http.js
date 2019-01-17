import { Token } from 'token.js';
import { Config } from 'config.js';

class Http {
  constructor() {
    "use strict";
    this.baseRestUrl = Config.restUrl;
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
          } else if (code == '405') {
            wx.redirectTo({
              url: '/pages/start/start',
            })
          } else if (code == '500') {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2500
            })
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2500
            })
            return
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