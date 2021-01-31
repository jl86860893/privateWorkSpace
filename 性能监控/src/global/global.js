const parser = require('ua-parser-js');

const get_global_info = function(w, data) {
  const uih = {...w.uih, ...data}; // 为什么这样做
  const _parser = new parser();
  // 这里是浏览器相关的信息
  const client_info = _parser.getResult();
  // 预置页面信息
  const page_info = {
    lib: uih.lib,
    lib_version: uih.lib_version,
    app_version: uih.app_version,
    is_first_time: uih.is_first_time,
    screen_height: document.body.clientHeight || document.documentElement.clientHeight,
    screen_width: document.body.clientWidth || document.documentElement.clientWidth,
    title: document.title,
    url: location.href,
    time: new Date().getTime(),
    manufacturer: 'U+',
    referrer: document.referrer,
  };

  // 获取用户相关数据
  const user_info = {
    distinct_id: uih.distinct_id || localStorage.visitorId || null,
    gender: uih.gender,
    year_of_birth: uih.year_of_birth,
    birthday: uih.birthday,
    country: uih.country,
    province: uih.province,
    city: uih.city,
    email: uih.email,
    phone_number: uih.phone_number,
    register_time: uih.register_time,
    first_visit_source: uih.first_visit_source,
  };
  const globalInfo = {
    user_info: Object.assign({}, user_info, page_info),
    client_info,
  }
  return globalInfo;
};

module.exports = {
  get: get_global_info,
};
