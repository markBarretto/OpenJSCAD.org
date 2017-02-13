let webpack = require('webpack');

let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: './dist',
    filename: 'build.js',
    publicPath: ''
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.json']
  },
  resolveLoader: {
    modulesDirectories: ["node_modules"]
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    },
         {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, 
        {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'raw'
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        },{
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json'
        },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/main.html',
      inject: 'body',
      hash: true
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      GL: 'exports?GL!'+__dirname+'/lightgl.js',
      OpenJsCad: __dirname+'/openjscad.js',
      OpenScad: './../openscad.js',
      csg: './csg.js'
    })
  ],
  worker: {
      output: {
        filename: "./src/components/openjscad-component/dist/worker-conversion.js", //created symbolic link at root of dist as this is a webcomponent worker-loader
        chunkFilename: "[id].worker-conversion.js"
      }
    }
}