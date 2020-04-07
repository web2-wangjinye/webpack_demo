let path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin= require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");
// 消除未使用的css
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
// const entry = require("./webpack_config/entry_webpack.js") 提取入口文件
if(process.env.type== "build"){
    var website={
        publicPath:"http://localhost:1717/"
    }
}else{
    var website={
        publicPath:"http://localhost:1717/"
    }
}
module.exports={
//    //监控代码变化代码一变化就自动进行实时打包
//    watch:true,
//    //监控的选项
//    watchOptions:{
//        poll:1000,     //每秒访问1000次
//        aggregateTimeout: 500,      //防抖，500毫秒内输入的东西只打包一次，如果写一个字母就打包一次，性能会很低
//        ignored: /node_modules/    //不需要监控的文件
//    },
    //入口文件的配置项
    // entry:entry.path,
    entry:glob.sync('./src/js/*.js'),
    //出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'./dist'),
        //输出的文件名称
        filename:'js/[name].js',
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
                use:  [
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
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
                use:{
                    loader:'babel-loader',
                },
                exclude:/node_modules/
              },{
                test: /\.(htm|html)$/i,
                 use:[ 'html-withimg-loader'] 
            },{
                test: /\.less$/,//打包Less文件
                // use: [{//未分离less文件时
                //        loader: "style-loader" // creates style nodes from JS strings
                //     }, {
                //         loader: "css-loader" // translates CSS into CommonJS
                //     }, {
                //         loader: "less-loader" // compiles Less to CSS
                //     }]
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins:[
        // new uglify(),
        new htmlPlugin({
            minify:{//是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号
                removeAttributeQuotes:true
            },
            hash:true,//为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS
            template:'./src/index.html'//是要打包的html模版路径和文件名称

        }),
        new extractTextPlugin("/css/index.css"),//这里的/css/index.css是分离后的路径位置。
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
            })
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
