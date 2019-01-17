import { Http } from 'http.js';
const http = new Http()
const TEST_URL = 'videoList'; /* 测试地址 */

export function _test(cb){
  var params = {
    type:'get',
    url: TEST_URL,
    data:{
      a:1
    },
    sCallback(res){
      cb && cb(res)
    }
  }
  http.request(params)
}