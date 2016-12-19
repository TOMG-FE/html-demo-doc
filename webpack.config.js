var $fs = require('fs');
var $path = require('path');

var $webpack = require('webpack');
var $webpackDevServer = require('webpack-dev-server');
var $progressBarPlugin = require('progress-bar-webpack-plugin');
var $extractTextPlugin = require('extract-text-webpack-plugin');
var $htmlWebpackPlugin = require('html-webpack-plugin');
var $webpackHmrEntryReplace = require('webpack-hmr-entry-replace');

var $CONFIG = {};
$CONFIG.root = $path.resolve(__dirname);
$CONFIG.src = $path.join($CONFIG.root, 'src');
$CONFIG.dist = $path.join($CONFIG.root, 'dist');

var webpackConfig = {
	entry: {
		'demo' : './index'
	},
	output: {
		//输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
		//这里要给绝对路径，否则某些插件会报错
		path: $CONFIG.dist,
		//模板、样式、脚本、图片等资源对应的server上的路径
		publicPath: '../',
		//每个页面对应的主js的生成配置
		filename: 'js/[name].js',
		//chunk生成的配置
		chunkFilename: 'js/chunk/[id].chunk.js'
	},
	devtool: 'eval-source-map',
	module: {
		loaders: []
	},
	plugins: [],
	devServer : {
		protocol : 'http',
		host : '127.0.0.1',
		port : 8090,
		contentBase : $CONFIG.dist,
		compress : false,
		quiet : false,
		noInfo : false,
		historyApiFallback : false,
		stats : {
			colors : true
		},
		hot : true
	}
};

//----- entry and output ------
if(process.env.NODE_ENV === 'production'){
	webpackConfig.output.path = $CONFIG.dist;
	webpackConfig.devtool = '';
}
//----- /entry and output ------

//----- loaders ------
webpackConfig.module.loaders.push({
	//文件加载器，处理文件静态资源
	test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	loader: 'file-loader?name=fonts/[name].[ext]'
});

webpackConfig.module.loaders.push({
	//文件加载器，处理文件静态资源
	test: /\.(jpe?g|png|gif|svg)$/i,
	// exclude: /(node_modules|bower_components)/,
	loader: 'file-loader?name=images/[name].[ext]'
});

if(process.env.NODE_ENV === 'production'){

	//使用 ExtractTextPlugin 导致了HMR失效，因此仅在最终部署时使用
	webpackConfig.module.loaders.push({
		test: /\.css$/,
		//配置css的抽取器、加载器。'-loader'可以省去
		loader: $extractTextPlugin.extract('css')
	});

	webpackConfig.module.loaders.push({
		test: /\.less$/,
		//配置less的抽取器、加载器。中间!有必要解释一下，
		//根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
		//你也可以开发自己的loader哟。有关loader的写法可自行谷歌之。
		loader: $extractTextPlugin.extract('css!less')
	});

}else{

	webpackConfig.module.loaders.push({
		test : /\.css$/,
		loader: 'style!css'
	});

	webpackConfig.module.loaders.push({
		test: /\.less$/,
		loader: 'style!css!less'
	});

}
//----- /loaders ------

//----- plugins ------
webpackConfig.plugins.push(
	//加载jq
	new $webpack.ProvidePlugin({
	    $: 'jquery'
	})
);

webpackConfig.plugins.push(
	//HtmlWebpackPlugin，模板生成相关的配置，每个对于一个页面的配置，有几个写几个
	new $htmlWebpackPlugin({
		// favicon路径，通过webpack引入同时可以生成hash值
		// favicon: './src/img/favicon.ico',
		//生成的html存放路径，相对于path
		filename: 'html/demo.html',
		//html模板路径
		template: $path.join($CONFIG.src, 'view/demo.html'),
		//js插入的位置，true/'head'/'body'/false
		inject: 'body',
		//为静态资源生成hash值
		hash: false,
		//需要引入的chunk，不配置就会引入所有页面的资源
		chunks: [
			'demo'
		],
		chunksSortMode: 'none',
		//压缩HTML文件
		minify: {
			//移除HTML中的注释
			removeComments: false,
			//删除空白符与换行符
			collapseWhitespace: false
		}
	})
);

webpackConfig.plugins.push(
	new $progressBarPlugin()
);

if(process.env.NODE_ENV === 'production'){
	webpackConfig.plugins.push(
		//单独使用link标签加载css并设置路径，相对于output配置中的publickPath
		new $extractTextPlugin('css/[name].css')
	);

	webpackConfig.plugins.push(
		//压缩JS
		new $webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	);
}else{
	$webpackHmrEntryReplace(webpackConfig);
}

//----- /plugins ------

module.exports = webpackConfig;
