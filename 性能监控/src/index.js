/*
  这里来撸一下跟浏览器有关系的各种参数
  文档的地址： https://github.com/faisalman/ua-parser-js
*/
require("babel-polyfill");
const _dedLog = require('./utils/dedLog');
const dedLog = {
  init: function() {
    _dedLog.init(...arguments);
  },
  send: function() {
    _dedLog.send(...arguments);
  },
  viewSend: function() {
    _dedLog.viewSend(...arguments);
  },
  sendAPM: function() {
    _dedLog.sendAPM(...arguments);
  }
};
window.dedLog = dedLog;
module.exports = dedLog;