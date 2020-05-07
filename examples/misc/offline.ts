import * as Tone from "tone";
import { html, render } from "lit-html";
import { until } from "lit-html/directives/until";

// play the buffer with a Tone.Player when it's been generated
const player = new Tone.Player().toDestination();

const renderingPromise = Tone.Offline(({ transport }) => {

	const reverb = new Tone.Reverb().toDestination();

	const pannerA = new Tone.Panner(-1).connect(reverb);
	const synthA = new Tone.Synth({
		envelope: {
			attack: 0.01,
			decay: 5,
			sustain: 0
		},
		oscillator: {
			type: "sawtooth4"
		}
	}).connect(pannerA);
	const seqA = new Tone.Sequence(((time, note) => {
		synthA.triggerAttack(note, time);
	}), ["A4", "G4", "G#4", "F#4", "E4"], "8n").start(0);
	seqA.loop = false;

	const pannerB = new Tone.Panner(1).connect(reverb);
	const synthB = new Tone.Synth({
		envelope: {
			attack: 0.001,
			decay: 3,
			sustain: 0
		},
		oscillator: {
			type: "square8"
		}
	}).connect(pannerB);
	const seqB = new Tone.Sequence(((time, note) => {
		synthB.triggerAttack(note, time);
	}), ["G#4", "A4", "G4", "F4", "C4"], "8n").start("16n");
	seqB.loop = false;

	const bass = new Tone.MonoSynth({
		envelope: {
			attack: 0.01,
			decay: 3,
			sustain: 0.1
		},
	}).toDestination();
	const bassSeq = new Tone.Sequence(((time, note) => {
		bass.triggerAttackRelease(note, "1n", time);
	}), ["C2", "C2", "F1", "F1"], "4n").start(0);
	bassSeq.loop = false;

	transport.bpm.value = 150;
	transport.start();

	// return a promise 
	return reverb.ready;
}, 7);

// set the buffer when it's done
renderingPromise.then(buffer => player.buffer = buffer);

render(html`
	${until(renderingPromise.then(() => html`
		<tone-play-toggle 
			@start=${() => player.start()}
			@stop=${() => player.stop()}
		></tone-play-toggle>
	`), html`rendering...`)}
`, document.querySelector("#content"));
