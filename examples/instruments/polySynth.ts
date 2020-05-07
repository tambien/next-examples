import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

const synth = new Tone.PolySynth(Tone.Synth, {
	oscillator: {
		partials: [0, 2, 3, 4],
	}
}).toMaster();

render(html`
	<tone-piano
		@noteon=${({ detail }) => synth.triggerAttack(detail.name, undefined, detail.velocity)}
		@noteoff=${({ detail }) => synth.triggerRelease(detail.name)}
	></tone-piano>
`, document.querySelector("#content"));

ui({
	tone: synth,
	name: "Synth",
	parent: document.querySelector("#content")
});
