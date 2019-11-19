import { html } from "lit-element";
import { VisBase } from "./vis-base";

type ToneAudioNodeWithBuffer = import("tone").ToneAudioNode & {buffer: import("tone").ToneAudioBuffer};

customElements.define("tone-buffer-vis", class extends VisBase {

	private tone: ToneAudioNodeWithBuffer;

	protected async generate() {
		if (!this.tone) {
			return;
		}
		if (!this.tone.buffer.loaded) {
			await new Promise(done => this.tone.buffer.onload = done);
		}
		const values = this.tone.buffer.getChannelData(0);
		this.draw(values);
	}

	bind(tone: import("tone").ToneAudioNode) {
		this.tone = tone as ToneAudioNodeWithBuffer;
		this.generate();
	}
});
