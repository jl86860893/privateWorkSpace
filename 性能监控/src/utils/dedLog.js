const globalInfo = require('../global/global');
const performance = require('../global/performance');
const FingerprintJS = require('./fp');
const eventFn = require('./addEvent');
const sendLog = require('./sendLog');

const _dedLog = {
  init: function (options, callback) {
    const params = options || {}
    this.url = params.url; // log server path
    this.root = params.root || document.body;
    this.logQueue = [];
    if (localStorage.uuid) {
      this.normalLogic();
    } else {
      this.initFingerprintJS();
    }

    if (callback) {
      callback();
    }
  },
  ququeSend: function() {
    if (this.logQueue.length) {
      const currentParams = this.logQueue.shift();
      sendLog(this.url, currentParams);
    }
  },
  queueStart: function() {
    const that = this;
    this.timer = setInterval(function() {
      that.ququeSend();
    }, 200);
  },
  initFingerprintJS: function() {
    FingerprintJS.load().then(fp => {
      // The FingerprintJS agent is ready.
      // Get a visitor identifier when you'd like to.
      fp.get().then(result => {
        // This is the visitor identifier:
        const visitorId = result.visitorId;
        localStorage.uuid = visitorId;
        this.resetTimer();
        this.normalLogic();
      });
    });
  },
  normalLogic: function() {
    window.uih = window.uih || {};
    window.uih.distinct_id = localStorage.uuid;
    this.addEvent();
  },
  send: function (options, target, event_type) {
    const params = options;
    const globalDatas = globalInfo.get(window);
    params.client_info = globalDatas.client_info;
    params.user_info = globalDatas.user_info;
    let sendDatas = params;
    if ( target ) {
      sendDatas = {
        ...this.getTargetDatas(target, event_type || 'click'),
        ...params,
      }
    }
    this.logQueue.push(sendDatas);
  },
  viewSend: function(options = {}) {
    const globalDatas = globalInfo.get(window);
    const params = {
      events: {
        type: 'view',
        ...options.events,
      },
      client_info: globalDatas.client_info,
      user_info: {
        ...globalDatas.user_info,
        ...options.user_info,
        current_page_live_time: new Date().getTime() - (sessionStorage.current_page_time || new Date().getTime()),
      }
    }
    this.logQueue.push(params);
    this.resetTimer();
  },
  getPerformance: function(callback) {
    const that = this;
    that.performanceInfo = performance();
    const page_ready_time = that.performanceInfo.page_ready_time;
    if (this.prev_page_ready_time === page_ready_time && page_ready_time > 0) {
      callback();
    } else {
      setTimeout(function(){
        that.prev_page_ready_time = page_ready_time;
        that.getPerformance(callback);
      }, 1000);
    }
  },
  sendAPM: function(options = {}) {
    const that = this;
    this.prev_page_ready_time = this.prev_page_ready_time || 0;
    this.getPerformance(function() {
      const globalDatas = globalInfo.get(window);
      const params = {
        events: {
          type: 'APM',
          ...options,
        },
        performance: that.performanceInfo,
        ...globalDatas,
      }
      that.logQueue.push(params);
    });
  },
  resetTimer: function() {
    sessionStorage.current_page_time = new Date().getTime();
  },
  getTargetDatas: function (target, event_type) {
    const params = {};
    const className = target.getAttribute('class');
    params.events = {
      type: event_type,
      block: target.getAttribute('block'),
      rset: target.getAttribute('rset'),
      element_id: target.getAttribute('id'),
      element_content: target.innerText,
      element_class_name: className,
      element_type: target.nodeName.toLocaleLowerCase(),
      element_selector: className ? target.getAttribute('class').split(' ')[0] : '',
      element_target_url: target.getAttribute('href'),
    };
    const excess = target.getAttribute('excess');
    if (excess) {
      if (/^{.*}$/g.test(excess)) {
        const curData = JSON.parse(excess);
        for (let key in curData) {
          params.events[key] = curData[key];
        }
      } else {
        params.events.other_string = excess;
      }
    }
    const globalDatas = globalInfo.get(window);
    params.client_info = globalDatas.client_info;
    params.user_info = globalDatas.user_info;
    return params;
  },
  clickSend: function(e) {
    if(e.target && e.target.getAttribute('data-log') === 'click') {
      const params = this.getTargetDatas(e.target, 'click');
      this.logQueue.push(params);
    }
  },
  hoverSend: function(e) {
    if(e.target && e.target.getAttribute('data-log') === 'hover') {
      const params = this.getTargetDatas(e.target, 'hover');
      this.logQueue.push(params);
    }
  },
  addEvent: function() {
    eventFn.addEvent(this.root, 'click', this.clickSend.bind(this));
    eventFn.addEvent(this.root, 'mouseover', this.hoverSend.bind(this));
    eventFn.addEvent(window, 'error', this.errorMsg.bind(this));
    this.queueStart();
  },
  errorMsg: function(e) {
    var error_info = {
      msg: e.error.message,
      stack: e.error.stack,
      lineno: e.lineno,
      colno: e.colno,
      error_time: new Date().getTime(),
    }
    const globalDatas = globalInfo.get(window);
    const params = {
      events: {
        type: 'error',
        ...error_info,
      },
      client_info: globalDatas.client_info,
      user_info: {
        ...globalDatas.user_info,
      }
    }
    this.logQueue.push(params);
  }
}

module.exports = _dedLog;