/* eslint-disable @typescript-eslint/no-var-requires */
const { relative, basename, extname, resolve } = require("path");
const glob = require("glob");

const examples = {};
glob.sync(resolve(__dirname, "./src/**/*.ts")).forEach(example => {
	const name = basename(example, extname(example));
	examples[name] = "./" + relative(__dirname, example);
});

const commonConfig = {
	context: __dirname,
	output: {
		path: resolve(__dirname, "build"),
		filename: "[name].js",
	},
	resolve: {
		extensions: [".ts", ".js"],
		alias: {
			"@tonejs/gui": resolve(__dirname, "./gui/src/index.ts"),
		}
	},
	externals: {
		tone: "Tone"
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /(node_modules)/,
				use: {
					loader: "ts-loader",
				}
			},
			{ 
				test: /\.scss$/, 
				use: [
					"to-string-loader", 
					"css-loader", 
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								indentedSyntax: false,
							},
						},
					},
				]
			},
			{ 
				test: /\.css$/, 
				use: [
					"style-loader",
					"css-loader"
				]
			},
			{ 
				test: /\.svg$/, 
				use: [
					"svg-inline-loader",
				]
			},
		]
	},
};

module.exports = [
	Object.assign({}, commonConfig, {
		entry: {
			components: "./components/index.ts"
		}
	}),
	Object.assign({}, commonConfig, {
		entry: examples,
	}),
	Object.assign({}, commonConfig, {
		entry: {
			gui: "./gui/src/index.ts"
		},
		output: {
			path: resolve(__dirname, "gui/build"),
			filename: "tone-gui.js",
			libraryTarget: "umd",
		},
	})
];
