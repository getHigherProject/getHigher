/* eslint-disable no-unused-vars */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
		// entry point of our app
		path.resolve(__dirname, 'client', 'src', 'index.js'),
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	devtool: 'eval-source-map',
	mode: 'development',
	devServer: {
		host: 'localhost',
		port: 8080,
		// enable HMR on the devServer
		hot: true,
		// fallback to root for other urls
		historyApiFallback: true,

		static: {
			// match the output path
			directory: path.resolve(__dirname, 'dist'),
			// match the output 'publicPath'
			publicPath: '/',
		},

		headers: { 'Access-Control-Allow-Origin': '*' },
		/**
		 * proxy is required in order to make api calls to
		 * express server while using hot-reload webpack server
		 * routes api fetch requests from localhost:8080/api/* (webpack dev server)
		 * to localhost:3000/api/* (where our Express server is running)
		 */
		proxy: {
			'/api/**': {
				target: 'http://localhost:3000/',
				secure: false,
			},
			'/assets/**': {
				target: 'http://localhost:3000/',
				secure: false,
			},
		},
	},
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /.(css|scss)$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
				loader: 'url-loader',
				options: { limit: false },
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'client/src/index.html'),
		}),
	],
	resolve: {
		// Enable importing JS / JSX files without specifying their extension
		extensions: ['.js', '.jsx'],
	},
};
