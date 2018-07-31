const webpack = require('webpack')

module.exports = {
  entry: './src/ledger.js',
  output: {
    path: __dirname + '/web/',
    filename: 'ledger-wallet.js',
    library: 'ledgerWallet',
    libraryTarget: 'var'
  },
  devtool: 'source-map',
  module: {
    rules: [
     {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
