//声明entry变量
const entrycss ={};  
const glob = require('glob');
let jspath = glob.sync('./src/css/*.css');
jspath.map(function(item,index){
  var name =item.split("/")[item.split("/").length-1]
  entrycss[name.split(".")[0]]=item
})
//声明路径属性
// entry.path={
//   entry:'./src/entry.js',
//   entry2:'./src/entry2.js'
// }
//进行模块化
module.exports =entrycss;