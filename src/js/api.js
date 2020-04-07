
import $request from './https.js'

// get请求不带参数
function isLogin() { 
  return $request({
        url: '/user/isLogin'
    }) 
}
// get请求带参数
function statisticTmCategory(params) {
   return $request({
    url: '/trademark/exact/statisticTmCategory',
    data: params
    }) 
}
// post请求表单格式
function list(params) {
  return $request({
   url: '/tmFavoriteOrder/list',
   type:"post",
   data: params
   }) 
}
// post请求json数据格式
function postJson(params) {
  return $request({
   url: '/tm/monitor/search',
   type:"post",
   json:true,
   data: JSON.stringify(params)
   }) 
}