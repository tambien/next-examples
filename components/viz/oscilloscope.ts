import { css, html, LitElement, property, unsafeCSS } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import "./button";
const style = require("./play-toggle.scss");
const playButton = require("../../assets/svg/play_arrow-24px.svg");
const stopButton = require("../../assets/svg/stop-24px.svg");

export class TonePlayToggle extends LitElement {

	@property({ type: Boolean })
	started = false;

	updated(changed) {
		if (changed.has("started")) {
			this.dispatchEvent(new CustomEvent(this.started ? "start" : "stop"));
		}
	}

	private async _clicked() {
		this.started = !this.started;
	}

	static get styles() {
		return css`${unsafeCSS(style)}`;
	}

	render() {
		return html`
			<tone-button @click=${this._clicked.bind(this)} 
				title=${this.started ? "Stop" : "Start"}
				aria-label=${this.started ? "Stop" : "Start"}>
				${unsafeHTML(!this.started ? playButton : stopButton)}
			</tone-button>
		`;
	}
}
customElements.define("tone-play-toggle", TonePlayToggle);
