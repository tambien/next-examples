import { ensureDir, readFile, writeFile } from "fs-extra";
import { compile, TemplateDelegate } from "handlebars";
import { promise as glob } from "glob-promise";
import { basename, dirname, extname, resolve, sep } from "path";
import { registerHelpers } from "./helpers";
import { registerPartials } from "./partials";
import { readJSON } from "fs-extra/lib/json";
const argv = require("yargs")
	.alias("o", "output")
	.requiresArg("output")
	.argv;

const TEMPLATE_DIR = resolve(__dirname, "./template");
const OUT_DIR = resolve(argv.output);
const IN_DIR = resolve(__dirname, "../src/");

async function getExampleTemplate(): Promise<TemplateDelegate> {
	const exampleTemplate = await readFile(resolve(TEMPLATE_DIR, "example.hbs"), "utf-8");
	return compile(exampleTemplate, {
		preventIndent: true,
	});
}

async function ensureDirs() {
	await ensureDir(OUT_DIR);
}

async function exampleHierarchy(examples) {
	const hierarchy = {};
	await Promise.all(examples.map(async example => {
		const fullPath = dirname(example).split(sep);
		const folder = fullPath[fullPath.length-1];
		const exampleFile = basename(example, extname(example));
		const json = await readJSON(example);
		if (!hierarchy[folder]) {
			hierarchy[folder] = {};
		}
		hierarchy[folder][json.title] = exampleFile;
	}));
	return hierarchy;
}

async function main() {
	await registerHelpers();
	await registerPartials();
	const examples = await glob(resolve(IN_DIR, "**/*.json"));
	const hierarchy = await exampleHierarchy(examples.sort());
	await ensureDirs();
	const exampleTemplate = await getExampleTemplate();
	examples.forEach(async exampleFile => {
		const json = await readJSON(exampleFile);
		json.hierarchy = hierarchy;
		const fileName = basename(exampleFile, ".json");
		json.script = `${fileName}.js`;
		await writeFile(resolve(OUT_DIR, `${fileName}.html`), exampleTemplate(json));
	});
}
main();
