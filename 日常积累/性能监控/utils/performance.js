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

  const { firstPaint, SpeedIndex } = window.RUMSpeedIndex();

  const performanceObj = [
    {
      name: 'DNS',
      result: domainLookupEnd - domainLookupStart,
      des: 'Time To First Byte，第一个字节到达的所需时长。',
    },
    {
      name: 'TTFB',
      result: responseStart - navigationstart,
      des: '用户看到有内容展示出来所需时长。',
    },
    {
      name: '白屏时间',
      result: domLoading - fetchStart,
      des: '用户看到有内容展示出来所需时长。',
    },
    {
      name: '用户可操作时间',
      result: domContentLoadedEventEnd - fetchStart,
      des: 'DOM ready被触发的所需时长，用户在这个时刻后方可对网页进行交互。',
    },
    {
      name: '网页加载完成时间',
      result: loadEventEnd - navigationstart,
      des: '整个页面加载完成的时间',
    },
    {
      name: 'dom树构建',
      result: domInteractive - domLoading,
      des: 'dom树构建',
    },
    {
      name: '首次内容渲染时间',
      result: firstPaint,
      des: '整个页面首次内容渲染firstPaint',
    },
    {
      name: '首次有效渲染时间',
      result: '限于chrom中的接口获取',
      des: '首次有效渲染firstContentfulPaint',
    },
    {
      name: 'dom总数',
      result: document.getElementsByTagName('*').length,
      des: '整个页面domCount',
    },
    {
      name: 'tcpConnect 连接时间',
      result: connectEnd - connectStart,
      des: 'tcp连接时间',
    },
    {
      name: 'speedindex',
      result: SpeedIndex,
      des: '速度指数',
    },
    {
      name: 'DOMContentLoaded',
      result: domContentLoadedEventStart - domLoading,
      des: 'DOM 和 CSSOM 均准备就绪的时间点',
    },
    {
      name: 'domComplete',
      result: domComplete - domLoading,
      des: '表示网页及其所有子资源都准备就绪的时间点',
    },
  ];

  return performanceObj;
}

export default performanceFn;
