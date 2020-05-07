import { css, html, LitElement, property, unsafeCSS } from "lit-element";
import { startContext } from "../util/start";
import { context, Destination } from "tone";
const style = require("./mute.scss");
// import "@material/mwc-icon";

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
			<mwc-icon-button-toggle onIcon="volume_off" offIcon="volume_up" @click=${this._clicked.bind(this)} ?on=${this.muted || this.suspended}>
				<!-- ${this.muted || this.suspended ? "volume_off" : "volume_up"} -->
				<!-- <mwc-icon></mwc-icon> -->
			</mwc-icon-button-toggle>
		`;
	}
}
customElements.define("tone-mute", ToneMuteButton);
