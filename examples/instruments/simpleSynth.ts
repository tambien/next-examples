import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

const synth = new Tone.Synth({
	oscillator: {
		type: "amtriangle",
		harmonicity: 0.5,
		modulationType: "sine"
	},
	envelope: {
		attackCurve: "exponential",
		attack: 0.05,
		decay: 0.2,
		sustain: 0.2,
		release: 1.5,
	},
	portamento: 0.05
}).toDestination();

render(html`
	<tone-piano
		@noteon=${({ detail }) => synth.triggerAttack(detail.name, undefined, detail.velocity)}
		@noteoff=${() => synth.triggerRelease()}
	></tone-piano>
`, document.querySelector("#content"));

ui({
	tone: synth,
	name: "Synth",
	parent: document.querySelector("#content")
});
