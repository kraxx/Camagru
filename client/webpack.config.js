const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const outputDirectory = "dist";

const clientPort = 6969;
const serverPort = 8080;

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "./bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: '[path][name]-[hash:8].[ext]'
            },
          }
        ]
      },
    ]
  },
  devServer: {
    port: clientPort,
    open: true,
    proxy: {
      "/api": `http://localhost:${serverPort}`
    },
    historyApiFallback: true // unsure what this is
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    })
  ]
};