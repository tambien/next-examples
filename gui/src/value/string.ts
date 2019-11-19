import { html, LitElement } from "lit-element";
import { ToneValue } from "./value";

customElements.define("tone-string", class extends ToneValue<string> {

	static get properties() {
		return Object.assign(ToneValue.properties, {
			value: { type: String }
		});
	}

	private _oninput(e: Event) {
		e.stopPropagation();
		e.stopImmediatePropagation();
		this.value = this.shadowRoot.querySelector("input").value;
		this.dispatchValue(this.value);
	}

	reset() {
		this.shadowRoot.querySelector("input").value = this.value;
	}

	render() {
		return html`
			<div id="container">
				<label for="string">${this.name}</label>
				<input 
					@input=${e => e.stopPropagation()}
					@change=${this._oninput.bind(this)}
					name="string" type="text" .value=${this.value}>
			</div>
		`;
	}
});
