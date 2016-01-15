const webpack = require('webpack');

module.exports = {

  entry: './index.js',

  output: {
    library: ['Pearson', 'Compounds', 'ng'],
    libraryTarget: 'umd',
    path: './dist',
    filename: 'pearson-compounds-ng.js'
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      angular: {
        root: 'angular',
        commonjs2: 'angular',
        commonjs: 'angular',
        amd: 'angular'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  },

  node: {
    Buffer: false
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]

};
