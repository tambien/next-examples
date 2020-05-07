import * as Tone from "tone";
import { html, render } from "lit-html";
import { drawer, ui } from "@tonejs/gui";

const bell = new Tone.MetalSynth({
	harmonicity: 12,
	resonance: 800,
	modulationIndex: 20,
	envelope: {
		decay: 0.4,
	},
	volume: -15
}).toDestination();

const bellPart = new Tone.Sequence(((time, freq) => {
	bell.triggerAttack(freq, time, Math.random()*0.5 + 0.5);
}), [[300, null, 200], 
	[null, 200, 200], 
	[null, 200, null], 
	[200, null, 200]
], "4n").start(0);

// bellPart.loop = true;
// bellPart.loopEnd = "1m";

const conga = new Tone.MembraneSynth({
	pitchDecay: 0.008,
	octaves: 2,
	envelope: {
		attack: 0.0006,
		decay: 0.5,
		sustain: 0
	}
}).toDestination();

const congaPart = new Tone.Sequence(((time, pitch) => {
	conga.triggerAttack(pitch, time, Math.random()*0.5 + 0.5);
}), ["G3", "C4", "C4", "C4"], "4n").start(0);

// congaPart.loop = true;
// congaPart.loopEnd = "1m";

Tone.Transport.bpm.value = 115;

render(html`
	<tone-play-toggle
		@start=${() => Tone.Transport.start()}
		@stop=${() => Tone.Transport.stop()}
	></tone-play-toggle>
`, document.querySelector("#content"));

drawer({
	parent: document.querySelector("#content"),
	open: false,
}).add({
	tone: bell,
	name: "Bell",
}).add({
	tone: conga,
	name: "Conga",
});
