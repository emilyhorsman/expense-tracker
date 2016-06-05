var webpack = require('webpack');
var merge = require('webpack-merge');
var autoprefixer = require('autoprefixer');
var path = require('path');

var TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

var target = path.resolve(__dirname, 'build/');
console.log('Target: ' + target);

var common = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		path.resolve(__dirname, 'app/index.jsx')
	],

	output: {
		path: target,
		filename: '[name].js'
	},

	resolve: {
		alias: { '~': path.resolve(__dirname, 'app/') },
		extensions: ['', '.js', '.jsx', '.json', '.scss'],
		modulesDirectories: ['node_modules']
	},

	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [
					'react-hot',
					'babel?presets[]=react,presets[]=es2015,presets[]=stage-0,presets[]=stage-1,presets[]=stage-2,plugins[]=add-module-exports'
				],
				include: [
					path.resolve(__dirname, 'app/'),
				],
			},

			{
				test: /\.json$/,
				loader: 'json',
			},

			{
				test: /\.scss$/,
				loader: 'style!css!postcss!sass',
				include: path.resolve(__dirname, 'app/')
			},

			{
				test: /\.css$/,
				loader: 'style!css!postcss'
			}
		]
	},

	sassLoader: {
		includePaths: [path.resolve(__dirname, 'node_modules/')]
	},

	postcss: function() {
		return {
			defaults: [autoprefixer],
			cleaner: [autoprefixer({ browsers: [
				'Chrome >= 35',
				'Firefox >= 31',
				'Edge >= 12',
				'Explorer >= 9',
				'iOS >= 8',
				'Safari >= 8',
				'Android 2.3',
				'Android >= 4',
				'Opera >= 12'
			]})]
		}
	}
};

if (TARGET === 'build') {
	module.exports = merge(common, {
		plugins: [
			new webpack.DefinePlugin({
				'process.env': { 'NODE_ENV': JSON.stringify('production') }
			}),

			new webpack.optimize.UglifyJsPlugin()
		]
	});
}

if (TARGET === 'start') {
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			// --hot --inline --progress in package.json script (npm run start)
			path: target,
			filename: '[name].js',
			publicPath: 'http://localhost:8080/',
			recordsPath: target,
			contentBase: target,
			host: '0.0.0.0',
			historyApiFallback: true
		}
	});
}
