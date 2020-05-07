import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

const synth = new Tone.FMSynth({
	modulationIndex: 12.22,
	envelope: {
		attack: 0.01,
		decay: 0.2
	},
	modulation: {
		type: "square"
	},
	modulationEnvelope: {
		attack: 0.2,
		decay: 0.01
	}
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
