const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取css到单独文件

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization: {
    // 代码分离
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all' // 将公共的依赖模块提取
        }
      }
    },
    moduleIds: 'deterministic',
    usedExports: true,
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: /\.(htm|html)$/i,
        use: ['html-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: path.resolve(__dirname, 'src'),
        type: 'asset/resource',
        generator: {
          filename: 'static/img/[hash][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        include: path.resolve(__dirname, 'src'),
        type: 'asset/resource',
        generator: {
          filename: 'static/font/[hash][ext][query]'
        }
      },
      // 处理scss文件
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '海外公司注册_一站式服务 | 中细软',
      keywords:
        '美国公司注册,英国公司注册,英国公司年审,离岸公司注册,美国开户,离岸公司年审,BVI公司,美国条形码申请,英国条形码申请',
      description:
        '中细软创新科技服务平台产业链由IP确权,IP交易,IP管理,IP金融四大板块构成,服务项目多达3000余种,致力于通过网络科技等手段,为全球科技创新提供系统的解决方案与信息服务.',
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      chunks: ['main']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css' //重命名输出的css文件，也可不写默认
    })
  ]
}
