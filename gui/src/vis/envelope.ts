import { VisBase } from "./vis-base";

customElements.define("tone-envelope-vis", class extends VisBase {

	private tone: import("tone").Envelope;

	protected async generate() {
		if (!this.tone) {
			return;
		}
		const values = await this.tone.asArray(this.width);
		this.draw(values);
	}

	bind(tone: import("tone").ToneAudioNode) {
		this.tone = tone as import("tone").Envelope;
		this.generate();
	}
});
