//app.js
import { Token } from 'utils/token.js';
import { Base } from 'utils/http.js';

App({
  onLaunch: function () {
    var token = new Token();
    token.verify();
  },
})