import * as marked from "marked";
import { registerHelper } from "handlebars";

export async function registerHelpers() {

	/**
	 * Convert this into markdown
	 */
	registerHelper("markdown", (text) => {
		// const text = content.fn(this);
		return marked(text);
	});
}
