import * as Tone from "tone";
import { html, render } from "lit-html";
import { drawer, ui } from "@tonejs/gui";

/**
 * KICK
 */
const kick = new Tone.MembraneSynth({
	envelope: {
		sustain: 0,
		attack: 0.02,
		decay: 0.8
	},
	octaves: 10,
	pitchDecay: 0.01,
}).toDestination();

const kickPart = new Tone.Loop(((time) => {
	kick.triggerAttackRelease("C2", "8n", time);
}), "2n").start(0);
		
/**
 * SNARE
 */
const snare = new Tone.NoiseSynth({
	volume: -10,
	envelope: {
		attack: 0.001,
		decay: 0.2,
		sustain: 0
	}
}).toDestination();

const snarePart = new Tone.Loop(((time) => {
	snare.triggerAttack(time);
}), "2n").start("4n");

/**
 * PIANO
 */
const piano = new Tone.PolySynth(Tone.Synth, {
	volume: -8,
	oscillator: {
		partials: [1, 2, 1],
	},
}).toDestination();

const cChord = ["C4", "E4", "G4", "B4"];
const dChord = ["D4", "F4", "A4", "C5"];
const gChord = ["B3", "D4", "E4", "A4"];

const pianoPart = new Tone.Part(((time, chord) => {
	piano.triggerAttackRelease(chord, "8n", time);
}), [["0:0:2", cChord], ["0:1", cChord], ["0:1:3", dChord], ["0:2:2", cChord], ["0:3", cChord], ["0:3:2", gChord]]).start("2m");

pianoPart.loop = true;
pianoPart.loopEnd = "1m";
pianoPart.humanize = true;

/**
 * BASS
 */
const bass = new Tone.MonoSynth({
	volume: -10,
	envelope: {
		attack: 0.1,
		decay: 0.3,
		release: 2,
	},
	filterEnvelope: {
		attack: 0.001,
		decay: 0.01,
		sustain: 0.5,
		baseFrequency: 200,
		octaves: 2.6
	}
}).toDestination();

const bassPart = new Tone.Sequence(((time, note) => {
	bass.triggerAttackRelease(note as string, "16n", time);
}), ["C2", ["C3", ["C3", "D2"]], "E2", ["D2", "A1"]], "4n").start(0);

bassPart.probability = 0.9;

// set the transport 
Tone.Transport.bpm.value = 90;

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
	name: "Kick",
	tone: kick,
	open: false,
}).add({
	name: "Snare",
	tone: snare,
	open: false,
}).add({
	name: "Bass",
	tone: bass,
	open: false,
}).add({
	name: "Keys",
	tone: piano,
	open: false,
});
