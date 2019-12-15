import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";
import { Midi } from "@tonejs/midi";

const synth = new Tone.PolySynth(Tone.Synth, {
	oscillator: {
		type: "fatsawtooth",
		count: 3,
		spread: 30
	},
	envelope: {
		attack: 0.01,
		decay: 0.3,
		sustain: 0.5,
		release: 0.4,
		attackCurve: "exponential"
	},
}).toDestination();

Midi.fromUrl("../assets/midi/Van_Halen_Jump_except.mid").then(midi => {
	
	// Van Halen - Jump MIDI from http://www.midiworld.com/files/1121/
	// converted using 
	const part = new Tone.Part(((time, note) => {
		synth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
	}), midi.tracks[0].notes).start(0);
	
	part.loop = true;
	part.loopEnd = "4m";
});

render(html`
	<tone-play-toggle 
		@start=${() => Tone.Transport.start("+0.1")}
		@stop=${() => Tone.Transport.stop()}
	></tone-play-toggle>
`, document.querySelector("#content"));

ui({
	tone: synth,
	name: "Supersaw",
	parent: document.querySelector("#content")
});
