import { html } from "lit-element";
import { ToneValue } from "./value";

customElements.define("tone-boolean", class extends ToneValue<boolean> {

	static get properties() {
		return Object.assign(ToneValue.properties, {
			value: { type: Boolean }
		});
	}

	private _oninput(e: Event) {
		e.stopPropagation();
		this.value = this.shadowRoot.querySelector("input").checked;
		this.dispatchValue(this.value);
	}

	reset() {
		this.shadowRoot.querySelector("input").checked = this.value;
	}

	render() {
		return html`
			<div id="container" class="boolean">
				<label for="check">${this.name}</label>
				<input
					@input=${this._oninput.bind(this)}
					name="check" type="checkbox" ?checked=${this.value}>
			</div>
		`;
	}
});
