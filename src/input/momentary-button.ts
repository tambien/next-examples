import { css, html, LitElement, property, unsafeCSS } from "lit-element";
const style = require("./momentary-button.scss");
import "./button";

export class ToneMomentaryButton extends LitElement {

	@property({ type: Boolean })
	triggered = false;
	
	static get styles() {
		return css`${unsafeCSS(style)}`;
	}

	render() {
		return html`
			<tone-button 
				?triggered=${this.triggered}
				@down=${() => this.triggered = true}
				@up=${() => this.triggered = false}>
				<div id="ring">
					<div id="circle"></div>
				</div>
			</tone-button>
		`;
	}
}
customElements.define("tone-momentary-button", ToneMomentaryButton);
