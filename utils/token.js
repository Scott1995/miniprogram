import {Config} from 'config.js';
class Token
{
  constructor()
  {
    this.tokenUrl = Config.restUrl + 'authorizations/weapp';
  }
  // 判断是否有token,若无则向服务端获取token
  verify()
  {
    var token = wx.getStorageSync('token');
    var expiration = wx.getStorageSync('token_expiration');
    var timestamp = Math.round(new Date().getTime() / 1000).toString();
    if (!token || expiration < timestamp){
      this.getTokenFromServer();
    }
  }
  getTokenFromServer(callBack)
  {
    var self = this;
    wx.login({
      success(res){
        wx.request({
          url: self.tokenUrl,
          method:'POST',
          data:{
            code:res.code
          },
          success(res){
            if (res.data.status_code == 410){
              self.getTokenFromServer(callBack)
            } else{
              var timestamp = Math.round(new Date().getTime() / 1000).toString();
              var expiration = parseInt(timestamp) + parseInt(res.data.expires_in)
              wx.setStorageSync('token', `${res.data.token_type} ${res.data.access_token}`);
              wx.setStorageSync('token_expiration', expiration);
              callBack && callBack(res.data.token);
            }
          }
        })
      }
    })
  }
}


export { Token };