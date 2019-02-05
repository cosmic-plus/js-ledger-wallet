module.exports = {
  entry: "./src/ledger.js",
  output: {
    path: __dirname + "/web/",
    filename: "ledger-wallet.js",
    library: "ledgerWallet",
    libraryTarget: "umd"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: "babel-loader"
      }
    ]
  }
}
