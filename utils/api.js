import { Http } from 'http.js';
const http = new Http()
const TEST_URL = 'videoList'; /* 测试地址 */
import route from 'route.js'

export function _test(data,cb){
  var params = {
    type:'get',
    url: route.test,
    data:data,
    sCallback(res){
      cb && cb(res)
    }
  }
  http.request(params)
}