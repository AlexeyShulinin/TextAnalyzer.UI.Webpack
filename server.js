const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.js');

const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(9000, () => console.log('Webpack server started listening ...'));