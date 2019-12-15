import { loaded, ToneAudioBuffer } from "tone";
import { css, html, LitElement, property, unsafeCSS } from "lit-element";
const style = require("./loader.scss");

export class ToneLoader extends LitElement {

	@property({ type: Boolean })
	loading = false;

	@property({ type: Number })
	dots = 0;

	static get styles() {
		return css`${unsafeCSS(style)}`;
	}

	firstUpdated(props) {
		super.firstUpdated(props);
		window.onload = () => {
			this.loading = ToneAudioBuffer.downloads.length > 0;
			if (this.loading) {
				loaded().then(() => {
					this.loading = false;
				});
				this._dotLoop();
			}
		};
	}

	private _dotLoop() {
		if (this.loading) {
			this.dots = (this.dots + 1) % 4;
			setTimeout(() => {
				this._dotLoop();
			}, 500);
		}
	}

	render() {
		let dots = "";
		for (let i = 0; i < this.dots; i++) {
			dots += ".";
		}
		return html`
			<div id="container" ?loading=${this.loading}>
				<div id="text">loading${dots}</div>
			</div>
		`;
	}
}
customElements.define("tone-loader", ToneLoader);
