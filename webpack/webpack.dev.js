const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file located at the specific path
dotenv.config({ path: path.resolve(__dirname, '.env/') });

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
            'process.env' :{
                'REACT_APP_BASE_API_KEY': JSON.stringify(process.env.REACT_APP_BASE_API_KEY),
                'REACT_APP_TENANT_ID': JSON.stringify(process.env.REACT_APP_TENANT_ID)
            }
        }),
        new ReactRefreshWebpackPlugin(),
    ]
}