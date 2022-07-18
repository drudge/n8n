const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
	chainWebpack: config => {
		config.resolve.symlinks(false);
		// config.plugins.delete("prefetch"); // enable when language package grows
	},
	transpileDependencies: [
	  '@drudge/curlconverter'
	//   /\/node_modules\/@drudge\/curlconverter/
	],
	pluginOptions: {
		webpackBundleAnalyzer: {
			openAnalyzer: false,
		},
		i18n: {
			locale: "en",
			fallbackLocale: "en",
			localeDir: "./src/i18n/locales",
			enableInSFC: false,
		},
	},
	configureWebpack: {
		devServer: {
			disableHostCheck: true,
		},
		plugins: [
			new MonacoWebpackPlugin({ languages: ['javascript', 'json', 'typescript'] }),
		],
	},
	css: {
		loaderOptions: {
			sass: {
				prependData: `
					@import "@/n8n-theme-variables.scss";
				`,
			},
		},
	},
	publicPath: process.env.VUE_APP_PUBLIC_PATH ? process.env.VUE_APP_PUBLIC_PATH : '/',
};
