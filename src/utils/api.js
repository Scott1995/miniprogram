import route from './route.js'
import { Http } from 'http.js';
const http = new Http()

export function _test(cb) {
  var params = {
    type: 'get',
    url: route.test,
    data: {
      a: 1
    },
    sCallback(res) {
      cb && cb(res)
    }
  }
  http.request(params)
}