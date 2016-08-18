module.exports = {
  webpack: {
    loaders: {
      css: {
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]'
      }
    }
  }
}
