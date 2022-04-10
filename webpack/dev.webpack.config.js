const app = require('./app.webpack.config');

module.exports = {
  ...app,
  target: 'web',
  devServer: {
    compress: true,
    port: 9000,
  },
};