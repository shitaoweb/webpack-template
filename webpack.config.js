const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/main.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true
  },
  module: {
    rules: [
	  // { test: /\.(sa|sc|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
	  { test: /\.css$/, use: ['style-loader', 'css-loader'] },
	  { test: /\.scss$/, use: ['style-loader', 'css-loader?modules&localIdentName=[name]_[local]-[hash:5]', 'sass-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader?modules&localIdentName=[name]_[local]-[hash:5]', 'less-loader'] },
      { test: /\.(png|jpg|gif|bmp)$/, use: 'url-loader?limit=43959?&name=images/img-[hash:8].[name].[ext]' },
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '开发测试页面',
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebackPlugin(),
    new webpack.ProvidePlugin({
        $:'xxx'   // 需要引入的第三方库向jquery，这里引用就不用分别在每个页面import了
    })
  ]
}