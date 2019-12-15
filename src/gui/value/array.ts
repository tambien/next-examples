import { html } from "lit-element";
import { ToneValue } from "./value";

customElements.define("tone-array", class extends ToneValue<number[]> {

	static get properties() {
		return Object.assign(ToneValue.properties, {
			value: { type: Array }
		});
	}

	shouldUpdate(changed) {
		if (changed.has("value")) {
			const oldVal = changed.get("value");
		} else {
		}
		return true;
	}

	reset() {
		// do nothing
	}

	protected scale(v: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
		const normV = Math.pow(((v - inMin) / (inMax - inMin)), 0.25);
		return normV * (outMax - outMin) + outMin;
	}

	private _mousemove(index: number, e: MouseEvent) {
		if (e.buttons) {
			let normValue = e.offsetY / (e.target as HTMLElement).clientHeight;
			normValue = Math.min(Math.max(normValue, 0), 1);
			this.value[index] = Math.pow(1 - normValue, 1 / 0.25);
			this.dispatchValue(this.value);
			this.requestUpdate();
		}
	}

	render() {
		const values = this.value.map(Math.abs);
		const min = Math.min(...values, 0);
		const max = Math.max(...values, 1);
		return html`
			<div id="container" class="array">
				<label ?disabled=${values.length === 0}>${this.name}</label>
				<span id="bars">
					${values.map((v, i) => html`
						<span class="bar" 
							@mousedown=${e => this._mousemove(i, e)}
							@mousemove=${e => this._mousemove(i, e)}>
							<span class="fill"  
								style="height: ${this.scale(v, min, max, 0, 100)}%;"></span>
						</span>
					`)}
				</span>
			</div>
		`;
	}
});
