import { VisBase } from "./vis-base";

customElements.define("tone-waveform-vis", class extends VisBase {

	protected height = 40
	private tone: import("tone").Waveform;

	protected generate() {
		// ignored
	}
	
	private loop() {
		requestAnimationFrame(this.loop.bind(this));
		if (!this.tone) {
			return;
		}
		const values = this.tone.getValue();
		this.draw(values);
	}

	bind(tone: import("tone").ToneAudioNode) {
		this.tone = tone as import("tone").Waveform;
		this.loop();
	}
});
