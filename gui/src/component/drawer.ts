import { css, html, LitElement, unsafeCSS } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { createElement, ToneAudioNodeElement, ToneAudioNodeElementOptions } from "./audio-node";
import { createFolder, ToneFolderElement, ToneFolderElementOptions } from "./folder";
const style = require("./drawer.scss");
const downArrow = require("../../../assets/svg/keyboard_arrow_down-24px.svg");
const upArrow = require("../../../assets/svg/keyboard_arrow_up-24px.svg");

/**
 * Collapsible element to add 
 */
export class ToneDrawerElement extends LitElement {
	static get properties() {
		return {
			open: { type: Boolean },
			hidden: { type: Boolean },
		};
	}

	/**
	 * If the element is collapsed
	 */
	open = true;

	/**
	 * If the element is not visible on the page
	 */
	hidden = false;

	firstUpdated(props) {
		super.firstUpdated(props);
		document.body.addEventListener("keypress", (e: KeyboardEvent) => {
			if (e.key === "H") {
				this.hidden = !this.hidden;
			}
		});
	}
	
	static get styles() {
		return css`${unsafeCSS(style)}`;
	}

	/**
	 * Add a Tone.js ToneAudioNode
	 */
	add(options: ToneAudioNodeElementOptions): ToneAudioNodeElement {
		const element = createElement(options);
		this.appendChild(element);
		return element;
	}
	
	/**
	 * Create a folder with the given name
	 */
	addFolder({ name }: ToneFolderElementOptions): ToneFolderElement {
		const element = createFolder({ name });
		this.appendChild(element);
		return element;
	}

	render() {
		return html`
			<div id="container" ?open=${this.open} ?hidden=${this.hidden}>
				<details ?open=${this.open} @toggle=${e => this.open = (e.target as HTMLDetailsElement).open}>
					<summary>
						${unsafeHTML(this.open ? downArrow : upArrow)}
						${this.open ? "close" : "open"}
					</summary>
					<div id="scroll">
						<div id="inner-scroll">
							<slot></slot>
						</div>
					</div>
				</details>
			</div>
		`;
	}
}

customElements.define("tone-drawer", ToneDrawerElement);

/**
 * Create a collapsible drawer 
 */
export function createDrawer(parent?: HTMLElement): ToneDrawerElement {
	const element = document.createElement("tone-drawer") as ToneDrawerElement;
	if (parent) {
		parent.appendChild(element);
	}
	return element;
}
