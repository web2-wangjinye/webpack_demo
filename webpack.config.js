let path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin= require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
var website ={
    publicPath:"http://192.168.1.64:1717/"//注意，这里的IP和端口，是你本机的ip或者是你devServer配置的IP和端口。
}
module.exports={
    //入口文件的配置项
    entry:{
        entry:'./src/entry.js',
        entry2:'./src/entry2.js'
    },
    //出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'./dist'),
        //输出的文件名称
        filename:'[name].js',
        // 分离css时处理图片问题
        publicPath:website.publicPath
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
        rules: [
            {
              test: /\.css$/,
              //use: [ 'style-loader', 'css-loader' ]//未分离css时使用
              use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
            },{
                test:/\.(png|jpg|gif)/ ,//是匹配图片文件后缀名称
                 use:[{//是指定使用的loader和loader的配置参数
                    loader:'url-loader',
                    options:{
                        limit:500000,//是把小于500000B的文件打成Base64的格式，写入JS。
                        outputPath:'images/',//打包后的图片放到images文件夹下
                        esModule:false//解决html-withimg-loader和html-webpack-plugin冲突问题
                    }
                }]
             },{
                test: /\.js$/,
                use: [{
                  loader: 'babel-loader',
                  options: {
                     presets: ['es2015']
                  }
                }]
              },{
                test: /\.(htm|html)$/i,
                 use:[ 'html-withimg-loader'] 
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins:[
        new uglify(),
        new htmlPlugin({
            minify:{//是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号
                removeAttributeQuotes:true
            },
            hash:true,//为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS
            template:'./src/index.html'//是要打包的html模版路径和文件名称

        }),
        new extractTextPlugin("/css/index.css")//这里的/css/index.css是分离后的路径位置。
    ],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717
    }
}
