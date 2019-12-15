import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

const env = new Tone.AmplitudeEnvelope({
	attack: 0.11,
	decay: 0.21,
	sustain: 0.5,
	release: 1.2
}).toDestination();

// create an oscillator and connect it to the envelope
const osc = new Tone.Oscillator({
	partials: [3, 2, 1],
	type: "custom",
	frequency: "C#4",
	volume: -8,
}).connect(env).start();

// render the interface
render(html`
	<tone-momentary-button 
		@down=${() => env.triggerAttack()}
		@up=${() => env.triggerRelease()}
	></tone-momentary-button>
`, document.querySelector("#content"));

// render the ui
ui({
	tone: env, 
	name: "Envelope",
	parent: document.querySelector("#content")
});
ui({
	tone: osc, 
	open: false,
	parent: document.querySelector("#content")
});
