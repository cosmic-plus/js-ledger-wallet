module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      [
        "@babel/preset-env",
        { useBuiltIns: "usage", corejs: 3, exclude: ["es.promise"] }
      ]
    ],
    plugins: ["@babel/plugin-transform-runtime"],
    sourceType: "unambiguous"
  }
}
