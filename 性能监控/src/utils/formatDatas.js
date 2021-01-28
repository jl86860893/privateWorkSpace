const formatDatas = function (datas) {
  const clear_obj_empty = function (data) {
    if (Object.prototype.toString.call(data) ===  '[object Object]') {
      for (let key in data) {
        const val = data[key];
        if (val === undefined || val === null || val === '') {
          delete data[key];
        }
        if (Object.prototype.toString.call(val) ===  '[object Object]') {
          clear_obj_empty(val);
        }
      }
    }
  }

  clear_obj_empty(datas);
  return datas;
}

module.exports = {
  formatDatas,
};