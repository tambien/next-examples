/* eslint-disable @typescript-eslint/no-var-requires */
const { relative, basename, extname, resolve } = require("path");
const glob = require("glob");

const examples = {};
glob.sync(resolve(__dirname, "./examples/**/*.ts")).forEach(example => {
	const name = basename(example, extname(example));
	examples[name] = "./" + relative(__dirname, example);
});

function createCommonConfig(output) {
	return {
		context: __dirname,
		output: {
			path: resolve(__dirname, output),
			filename: "[name].js",
		},
		resolve: {
			extensions: [".ts", ".js"],
			alias: {
				"@tonejs/gui": resolve(__dirname, "./src/gui/index.ts"),
				// tone: resolve(__dirname, "../Tone.js/"),
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
									includePaths: ["node_modules"],
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
}

module.exports = env => {
	return [
		Object.assign({}, createCommonConfig(env.output), {
			entry: {
				components: "./src/index.ts"
			}
		}),
		Object.assign({}, createCommonConfig(env.output), {
			entry: examples,
		}),
		Object.assign({}, createCommonConfig(env.output), {
			entry: {
				gui: "./src/gui/index.ts"
			},
			output: {
				path: resolve(__dirname, env.output),
				filename: "tone-gui.js",
				libraryTarget: "umd",
			},
		})
	];
};
