
/**
** 封装请求方法
** url 接口请求地址
** data 接口请求参数（无需请求方式参数，则此项可以为空，否则必须传）
** params 请求方式参数（可以为空）
**/
// let scriptElem = document.createElement("SCRIPT");
// scriptElem.src = "/mobile/api/apiUrl.js?v="+ Math.random();
// $('head').append(scriptElem);

//获取地址栏参数
(function ($) {
  $.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
})(jQuery);
// ---------------------------------------------------
//  在js中调用如下
//  var ppkid = $.getUrlParam('ppkid');
//  var schid = $.getUrlParam('schid');
//  --------------------------------------------------
var baseUrl = "/api"
function $request(options) {
  // url, data, params
  options = options || {}
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: baseUrl + options.url,
      type: (options.type || "GET").toUpperCase(),
      contentType:(options.json?"application/json;charset=utf-8":'application/x-www-form-urlencoded'),
      dataType: options.dataType || 'JSON',
      async : options.async || true,
      data: options.json?(options.data):getParams(options.data),
      success: function (res) {
        if (res.code == 101) {
          localStorage.removeItem('token');
          //localStorage.removeItem('sharesid');
         // var  ppkid = localStorage.getItem('ppkid');
          //var  schid = localStorage.getItem('schid');
          //window.location.href="/mobile/kyk/single.html?schid="+schid+"&ppkid="+ppkid+"&v="+Math.random();
        } else {
          resolve(res)
        }
      },
      error: function (res) {
        // reject(res)
      },
      headers: {
        "x-access-token": localStorage.getItem('token') || '',
      }
    });
  })
}
/**
 * 对象参数的处理
 * @param data
 * @returns {string}
 */
function getParams(data) {
  var arr = [];
  for (var param in data){
      arr.push(encodeURIComponent(param) + '=' +encodeURIComponent(data[param]));
  }
  arr.push(('date=' + new Date()));
  console.log(arr);
  return arr.join('&');
}
export default $request