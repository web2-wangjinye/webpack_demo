//声明entry变量
const entry ={};  
const glob = require('glob');
let jspath = glob.sync('./src/js/*.js');
jspath.map(function(item,index){
  var name =item.split("/")[item.split("/").length-1]
  entry[name.split(".")[0]]=item
})
//声明路径属性
// entry.path={
//   entry:'./src/entry.js',
//   entry2:'./src/entry2.js'
// }
//进行模块化
module.exports =entry;