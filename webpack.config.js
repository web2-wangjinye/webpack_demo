let path = require('path');
module.exports={
    //入口文件的配置项
    entry:{
        entry:'./src/entry.js'
    },
    //出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'./dist'),
        //输出的文件名称
        filename:'bundle.js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}


// module.exports = {
//     mode: 'production',         // 模式，默认两种 production和development
//     entry: './src/index.js',    // 入口，从哪个文件开始打包
//     output: {                   // 出口
//         filename: 'bundle.js',  // 打包后的文件名
//         path: path.resolve(__dirname, './build')   // 路径必须是一个绝对路径
//     }
// };