import { css, html, LitElement, property, unsafeCSS } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { startContext } from "../util/start";
import { context, Destination } from "tone";
const style = require("./mute.scss");
const mutedButton = require("../../assets/svg/volume_off-24px.svg");
const unmutedButton = require("../../assets/svg/volume_up-24px.svg");

export class ToneMuteButton extends LitElement {

	@property({ type: Boolean })
	muted = false;

	@property({ type: Boolean })
	suspended = true;

	static get styles() {
		return css`${unsafeCSS(style)}`;
	}

	firstUpdated(props) {
		super.firstUpdated(props);
		setInterval(() => {
			this.suspended = context.state === "suspended";
		}, 100);
	}

	updated(changed) {
		if (changed.has("muted")) {
			Destination.mute = this.muted;
		}
	}

	private async _clicked() {
		if (this.suspended) {
			await startContext();
		} else {
			this.muted = !this.muted;
		}
	}

	render() {
		return html`
			<button @click=${this._clicked.bind(this)}>
				${unsafeHTML(this.muted || this.suspended ? mutedButton : unmutedButton)}
			</button>
		`;
	}
}
customElements.define("tone-mute", ToneMuteButton);
