const sendLog = function (url, datas) {
  const result = [];
  for (let key in datas) {
    const val = datas[key];
    result.push(key + '=' + encodeURIComponent(JSON.stringify(val)));
  };

  const queryStr = '?' + result.join('&');
  const oImg = new Image();
  console.log(datas);
  oImg.src = url + queryStr;
}

module.exports = sendLog;