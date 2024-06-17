const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
module.exports ={
    mode: 'development',
    devServer:{
        hot: true,
        open: true,
        historyApiFallback: true,
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BASE_API_KEY': JSON.stringify('http://localhost:8080/api/'),
            'process.env.BASE_UI_FIELDS_API': JSON.stringify('http://localhost:8081/'),
            'process.env.CUSTOMER_ID': JSON.stringify('1')
        }),
        new ReactRefreshWebpackPlugin(),
    ]
}