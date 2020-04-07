# webpack_demo
webpack打包demo
局部安装webpack方法: https://blog.csdn.net/wg8ofk08/article/details/94621569
局部安装webpack之后如何使用：https://blog.csdn.net/liangmengbk/article/details/84799623





#webpack3.X版本
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install --save-dev webpack@3.6.0
npm install --save-dev webpack-cli@3.3.11

#打包方式1：
#cd node_modules\.bin
#webpack ../../src/entry.js ../../dist/bundle.js

#打包方式2：
#建立webpack.config.js;
let path = require('path');
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
        filename:'[name].js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}
#配置package.json;
 "scripts": {
    "build": "webpack"
  },
#运行npm run build


#热更新打包
#安装npm install webpack-dev-server --save-dev
注意：
webpack 3.x 要使用 webpack-dev-server 2.x
webpack 4.x 要使用 webpack-dev-server 3.x
#再次配置webpack.config.js;
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
#再次配置package.json
"scripts": {
    "server":"webpack-dev-server"
 }

#文件打包解释
#Loaders
注意：所有的Loaders都需要在npm中单独进行安装，并在webpack.config.js里进行配置。
1、test：用于匹配处理文件的扩展名的表达式，这个选项是必须进行配置的；
2、use：loader名称，就是你要使用模块的名称，这个选项也必须进行配置，否则报错；
3、include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
4、query：为loaders提供额外的设置选项（可选）。
#打包CSS文件
style-loader是用来处理css文件中的url()等:npm install style-loader --save-dev
css-loader是用来将css插入到页面的style标签:npm install --save-dev css-loader

#文件打包步骤
<!-- css -->
1、安装style-loader、css-loader
2、配置loaders
    module:{
          rules: [
              {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
              }
          ]
      },
<!-- js -->
1、引入 const uglify = require('uglifyjs-webpack-plugin');
2、在plugins配置里new一个 uglify对象
    plugins:[
        new uglify()
    ],
<!-- html -->
1、引入const htmlPlugin= `require`('html-webpack-plugin');
2、在plugins配置添加
    new htmlPlugin({
        minify:{
            removeAttributeQuotes:true
        },
        hash:true,
        template:'./src/index.html'
    })
<!-- 图片处理 -->
1、安装npm install --save-dev file-loader url-loader
  file-loader：解决引用路径的问题，拿background样式用url引入背景图来说，我们都知道，webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。

  url-loader：如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。url-loader会将引入的图片编码，生成dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。
2、配置url-loader
  {
    test:/\.(png|jpg|gif)/ ,//是匹配图片文件后缀名称
      use:[{//是指定使用的loader和loader的配置参数
        loader:'url-loader',
        options:{
            limit:500000//是把小于500000B的文件打成Base64的格式，写入JS。
        }
    }]
  }

  #解决报错
  1、安装npm install --save-dev babel-preset-es2015
  2、安装babel-loader、babel-core
  2、修改【webpack.config.js】配置文件
   {
    test: /\.js$/,
    use: [{
      loader: 'babel-loader',
      options: {
          presets: ['es2015']
      }
    }]
  }
  3、根目录下添加【.babelrc】文件
  {
    "presets": ["es2015"]
  }

#将css分离出来（前面css是引入到js里面的，实际开发分离出来居多）
1、安装npm install --save-dev extract-text-webpack-plugin
2、引入：安装完成后，需要先用require引入。const extractTextPlugin = require("extract-text-webpack-plugin");
3、设置Plugins：引入成功后需要在plugins属性中进行配置。new extractTextPlugin("/css/index.css")

#处理图片 <img src="images/timg.jpg" /> 打包问题
1、安装npm install html-withimg-loader --save
2、配置loader
{
    test: /\.(htm|html)$/i,
     use:[ 'html-withimg-loader'] 
}
