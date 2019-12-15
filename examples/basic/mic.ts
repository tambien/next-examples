import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui, waveform } from "@tonejs/gui";

// you probably DONT want to connect the microphone
// directly to the master output because of feedback.
const mic = new Tone.UserMedia();

const meter = new Tone.Waveform();
mic.connect(meter);

render(html`
	<tone-mic-button 
		?supported=${Tone.UserMedia.supported}
		@close=${() => mic.close()}
		@open=${() => mic.open()}></tone-mic-button>
`, document.querySelector("#content"));

waveform({
	tone: meter,
	parent: document.querySelector("#content")
});
