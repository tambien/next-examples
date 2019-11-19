import { css, html, LitElement, property, unsafeCSS } from "lit-element";
import "../value/number";
import "../value/string";
import "../value/array";
import "../value/boolean";
import "../vis/visualizer";
import { ToneVisualizer } from "../vis/visualizer";
const style = require("./audio-node.scss");
import { unsafeHTML } from "lit-html/directives/unsafe-html";
const downArrow = require("../../../assets/svg/arrow_drop_down-24px.svg");
const upArrow = require("../../../assets/svg/arrow_drop_right-24px.svg");

export interface ToneAudioNodeElementOptions {
	tone: import("tone").ToneAudioNode; 
	name?: string; 
	open?: boolean;
}

export class ToneAudioNodeElement extends LitElement {

	/**
	 * The name of the node
	 */
	@property({ type: String })
	name: string;

	/**
	 * If the node is open or closed
	 */
	@property({ type: Boolean })
	open = true;

	/**
	 * Hold the class tone element
	 */
	private tone: import("tone").ToneAudioNode;

	private pathToObject(path: string[], value: any) {
		const obj = {};
		let subValue = obj;
		path.forEach((prop, index) => {
			if (index === path.length - 1) {
				subValue[prop] = value;
			} else {
				subValue[prop] = {};
				subValue = subValue[prop];
			}
		});
		return obj;
	}

	private pathToValue(path: string[], obj: any) {
		let subValue = obj;
		let retValue = undefined;
		path.forEach((prop, index) => {
			if (index === path.length - 1) {
				retValue = subValue[prop];
			} else {
				subValue = subValue[prop];
			}
		});
		return retValue;
	}

	async bind(tone: import("tone").ToneAudioNode) {
		this.tone = tone;
		await this.requestUpdate();
		// also bind all of the children nodes
		this.shadowRoot.querySelectorAll("tone-visualizer").forEach((vis: ToneVisualizer) => {
			vis.bind(this.tone);
		});
	}

	private setValue(path: string[], detail: {value: any; reject: (val: any) => void}) {
		if (this.tone) {
			const currentValue = this.tone.get();
			try {
				this.tone.set(this.pathToObject(path, detail.value));
			} catch (e) {
				const previousValue = this.pathToValue(path, currentValue);
				this.tone.set(this.pathToObject(path, previousValue));
				detail.reject(previousValue);
			}
			this.requestUpdate();
		}
	}

	private renderValue(name: string, values: any, path: string[]) {
		if (this.tone && this.tone.toString() === "Waveform") {
			return html``;
		}
		const value = values[name];
		if (typeof value === "number") {
			return html`
				<tone-number 
					class="value"
					@value=${e => this.setValue(path, e.detail)}
					name="${name}" value=${value}></tone-number>
					`;
		} else if (typeof value === "string") {
			return html`
				<tone-string 
					class="value"
					@value=${e => this.setValue(path, e.detail)}
					name="${name}" value="${value}"></tone-string>
				`;
		} else if (typeof value === "boolean") {
			return html`
				<tone-boolean 
					class="value"
					@value=${e => this.setValue(path, e.detail)}
					name="${name}" ?value=${value}></tone-boolean>
			`;
		} else if (Array.isArray(value)) {
			return html`
				<tone-array 
					class="value"
					@value=${e => this.setValue(path, e.detail)}
					name="${name}" value=${JSON.stringify(value)}></tone-array>
					`;
		} else if (typeof value === "object") {
			return html`
				<details>
					<summary>
						${name}
					</summary>
					<div class="sub-values">${this.renderValues(value, [...path])}</div>
				</details>
			`;
		}
	}

	private toneObjFromPath(path: string[]): object {
		let tone = this.tone;
		path.forEach(seg => {
			tone = tone[seg];
		});
		if (tone) {
			return tone.get();
		} else {
			return {};
		}
	}

	private renderValues(values: any, path: string[]) {
		return html`
			<tone-visualizer 
				path=${JSON.stringify(path)} 
				values=${JSON.stringify(this.toneObjFromPath(path))}>
			</tone-visualizer>
			${Object.keys(values).map(name => html`
				${this.renderValue(name, values, [...path, name])}
			`)}
		`;
	}
	
	static get styles() {
		return css`${unsafeCSS(style)}`;
	}
	
	render() {
		if (this.tone) {
			return html`
				<div id="container">
					<details ?open=${this.open} @toggle=${e => this.open = (e.target as HTMLDetailsElement).open}>
						<summary id="title">
							<!-- ${unsafeHTML(this.open ? downArrow : upArrow)} -->
							${this.name}
						</summary>
						${this.renderValues(this.tone.get(), [])}
					</details>
				</div>
				`;
		} else {
			return html`
				<div id="container">
					<h4>${this.name}</h4>
					<div>Set a Tone.js object with 'bind'</div>
				</div>
			`;
		}
	}
}

customElements.define("tone-audio-node", ToneAudioNodeElement);

type ElementOptions = ToneAudioNodeElementOptions & {parent?: HTMLElement};

/**
 * Create an audio node element
 */
export function createElement({ 
	tone, 
	name = tone.toString(), 
	parent, 
	open=true
}: ElementOptions): ToneAudioNodeElement {
	const element = document.createElement("tone-audio-node") as ToneAudioNodeElement;
	element.bind(tone);
	element.name = name;
	element.open = open;
	if (parent) {
		parent.appendChild(element);
	}
	return element;
}
