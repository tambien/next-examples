import { html } from "lit-element";
import { VisBase } from "./vis-base";

customElements.define("tone-oscillator-vis", class extends VisBase {

	private tone: import("tone").Oscillator;

	protected async generate() {
		if (!this.tone) {
			return;
		}
		const values = await this.tone.asArray(600);
		this.draw(values);
	}

	bind(tone: import("tone").ToneAudioNode) {
		this.tone = tone as import("tone").Oscillator;
		this.generate();
	}
});
