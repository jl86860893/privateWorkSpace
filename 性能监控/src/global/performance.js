const RUMSpeedIndex = require('../utils/speenIndex');

const performanceFn = () => {
  const { timing: {
    fetchStart,
    domainLookupStart,
    domainLookupEnd,
    connectStart,
    connectEnd,
    // secureConnectionstart,
    // requestStart,
    domContentLoadedEventStart,
    domComplete,
    responseStart,
    // responseEnd,
    domLoading,
    // loadEventStart,
    loadEventEnd,
    domContentLoadedEventEnd,
    domInteractive,
  } } = window.performance;

  let {
    timing: {
      navigationstart,
    },
  } = window.performance;
  navigationstart = navigationstart || fetchStart;

  const { firstPaint, SpeedIndex } = RUMSpeedIndex();

  const performanceObj = {
    dns: domainLookupEnd - domainLookupStart,
    ttfb: domainLookupEnd - domainLookupStart,
    white_screen_time: domLoading - fetchStart,
    can_operation_time: domContentLoadedEventEnd - fetchStart,
    page_ready_time: loadEventEnd - navigationstart,
    create_dom_time: domInteractive - domLoading,
    first_paint: firstPaint,
    dom_num: document.getElementsByTagName('*').length,
    tcpConnect: connectEnd - connectStart,
    speed_index: SpeedIndex,
    dom_content_loaded: domContentLoadedEventStart - domLoading,
    dom_complete: domComplete - domLoading,
  };

  return performanceObj;
}

module.exports = performanceFn;
