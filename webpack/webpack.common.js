const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),
  
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_module/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use : ['style-loader', 'css-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx','.js', '.jsx'],
  },
  output:{
    path: path.resolve(__dirname, './../build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
        template:path.resolve(__dirname, '..', './src/index.html')
    })
  ],
  performance: {
    hints: false, // or 'warning' or 'error'
    maxAssetSize: 500000, // adjust this value according to your needs
    maxEntrypointSize: 500000, // adjust this value according to your needs
  },
};
