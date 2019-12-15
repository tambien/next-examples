import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

const synth = new Tone.AMSynth({
	harmonicity: 2.5,
	oscillator: {
		type: "fatsawtooth"
	},
	envelope: {
		attack: 0.1,
		decay: 0.2,
		sustain: 0.2,
		release: 0.3
	},
	modulation: {
		type: "square"
	},
	modulationEnvelope: {
		attack: 0.5,
		decay: 0.01
	}
}).toDestination();

render(html`
	<tone-piano
		@noteon=${({ detail }) => synth.triggerAttack(detail.name, Tone.now(), detail.velocity)}
		@noteoff=${() => synth.triggerRelease()}
	></tone-piano>
`, document.querySelector("#content"));

ui({
	tone: synth,
	name: "Synth",
	parent: document.querySelector("#content")
});

