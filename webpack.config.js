module.exports = {
  entry: "./es5/ledger.js",
  output: {
    path: __dirname + "/web/",
    filename: "ledger-wallet.js",
    library: "ledgerWallet",
    libraryTarget: "umd"
  },
  devtool: "source-map"
}
