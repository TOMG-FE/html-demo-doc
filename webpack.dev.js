var $webpack = require('webpack');
var $webpackDevServer = require('webpack-dev-server');
var $webpackConfig = require('./webpack.config');

//----- dev server ------
var compiler = $webpack($webpackConfig);
var server = new $webpackDevServer(compiler, $webpackConfig.devServer);
server.listen($webpackConfig.devServer.port);
//----- /dev server ------