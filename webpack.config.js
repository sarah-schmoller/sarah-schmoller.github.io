const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js', // Adjust if necessary
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',  // Ensure the public path is set correctly
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
        include: ['/Users/schmollers/GitHubPersonal/sarah-schmoller.github.io/src/components/'],
        exclude: ['/node_modules/'],
      },
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML template
      filename: 'index.html',
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: 'http://localhost:8080/',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),  // Serve static files from the public folder
    },
    port: 8080,
    historyApiFallback: true,  // Ensure unknown paths fallback to index.html
    open: true,  // Optional: Automatically open the browser
  },
};