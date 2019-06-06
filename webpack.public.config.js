const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/*引入打包时自动删除dist目录的包*/
const CleanWebackPlugin = require('clean-webpack-plugin')
/*引入抽取css文件的包*/
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
/*引入压缩css文件的包*/
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/main.js')
  },
  output: {
    filename: 'js/[name].[chunkhash:8].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  /*mode 模式 优化压缩js*/
  mode: 'production',
  module: {
    rules: [
	  // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
	  // { test: /\.scss$/, use: ['style-loader', 'css-loader?modules&localIdentName=[name]_[local]-[hash:5]', 'sass-loader'] },
      // { test: /\.less$/, use: ['style-loader', 'css-loader?modules&localIdentName=[name]_[local]-[hash:5]', 'less-loader'] },
      // { test: /\.(sa|sc|c|le)ss$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.(sa|sc|c|le)ss$/, 
        use: [
           {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              },
           },
           'css-loader',
           'less-loader'
        ]
      },
      { test: /\.(png|jpg|gif|bmp)$/, use: 'url-loader?limit=43959?&name=images/img-[hash:8].[name].[ext]' },
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '开发测试页面',
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
      /*压缩HTML代码*/
      minify:{
        collapseWhitespace: true, // 合并空白字符
        removeComments: true, // 移除注释
        removeAttributeQuotes: true // 移除属性上的引号
      }
    }),
    /*抽取css文件*/
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    /*打包时自动删除dist文件*/
    new CleanWebackPlugin(),
    /*引入第三方库ProvidePlugin*/
    new webpack.ProvidePlugin({
        $:'jquery'
    }),
	/*压缩Css*/
	new OptimizeCssAssetsPlugin()
  ],
  /*分离第三方包*/
  optimization: {
    splitChunks: {
      chunks: 'all', // async/all/initial
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors'
        },
      }

    }
  }
}