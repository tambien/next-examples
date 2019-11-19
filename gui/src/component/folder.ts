import { css, html, LitElement, property, unsafeCSS } from "lit-element";
import { createElement, ToneAudioNodeElement, ToneAudioNodeElementOptions } from "./audio-node";
const style = require("./folder.scss");
import { unsafeHTML } from "lit-html/directives/unsafe-html";
const downArrow = require("../../../assets/svg/arrow_drop_down-24px.svg");
const upArrow = require("../../../assets/svg/arrow_drop_right-24px.svg");

export interface ToneFolderElementOptions {
	name?: string;
	open?: boolean;
}

/**
 * A collapsible folder inside tone-drawer
 */
export class ToneFolderElement extends LitElement {

	/**
	 * If it is open or collapsed
	 */
	@property({ type: Boolean })
	open = true;

	/**
	 * The name of the folder
	 */
	@property({ type: String })
	name: string;
	
	static get styles() {
		return css`${unsafeCSS(style)}`;
	}

	/**
	 * Add a Tone.js ToneAudioNode
	 */
	add({ tone, name }: ToneAudioNodeElementOptions): ToneAudioNodeElement {
		const element = createElement({
			tone, name
		});
		this.appendChild(element);
		return element;
	}

	render() {
		return html`
			<div id="container" ?open=${this.open}>
				<details ?open=${this.open} @toggle=${e => this.open = (e.target as HTMLDetailsElement).open}>
					<summary>
						${unsafeHTML(this.open ? downArrow : upArrow)}
						${this.name}
					</summary>
					<div id="contents">
						<slot></slot>
					</div>
				</details>
			</div>
		`;
	}
}

customElements.define("tone-folder", ToneFolderElement);

type ElementOptions = ToneFolderElementOptions & {parent?: HTMLElement};

/**
 * Create a folder with the given name
 */
export function createFolder({ 
	name, parent,
	open = false
}: ElementOptions): ToneFolderElement {
	const element = document.createElement("tone-folder") as ToneFolderElement;
	element.name = name;
	element.open = open;
	if (parent) {
		parent.appendChild(element);
	}
	return element;
}
