module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  target: 'electron-main',
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [{ loader: 'ts-loader' }]
    }]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: __dirname + '/../dist',
    filename: 'main.js'
  }
};