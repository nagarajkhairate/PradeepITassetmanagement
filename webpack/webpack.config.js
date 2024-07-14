const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js');

const webpack = require('webpack');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

module.exports = (envVars) => {
    const { env } = envVars
    const envConfig = require(`./webpack.${env}.js`);
    const config = merge(commonConfig, envConfig);
    config.plugins.push(
        new webpack.DefinePlugin(envKeys)
    );
    return config
}