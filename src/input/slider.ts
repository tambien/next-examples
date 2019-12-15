import { css, html, LitElement, property, unsafeCSS } from "lit-element";
const style = require("./slider.scss");
import "@material/mwc-slider";

export class ToneSlider extends LitElement {

	@property({ type: Number })
	min = 0;

	@property({ type: Number })
	max = 100;

	@property({ type: Number })
	value = 50;

	@property({ type: Number })
	step = 1;

	@property({ type: String })
	label = "";

	@property({ type: String })
	units = "";
	
	static get styles() {
		return css`${unsafeCSS(style)}`;
	}

	render() {
		console.log(this.step);
		return html`
			<div id="container">
				<div id="label">
					<label for="slider">${this.label}</label>
					<span class="value">${this.value} <span class="units">${this.units}</span></span>
				</div>
				<mwc-slider name="slider"
					.min=${this.min}
					.max=${this.max}
					.value=${this.value}
					.step=${this.step}
					@input=${e => this.value = e.target.value}
				></mwc-slider>
			</div>
		`;
	}
}
customElements.define("tone-slider", ToneSlider);
