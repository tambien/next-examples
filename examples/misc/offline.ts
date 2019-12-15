import * as Tone from "tone";

// load the buffer for use in the convolver
const buffer = new Tone.ToneAudioBuffer("./audio/IRs/chorus-feedback.wav");

// function generateAudioOffline() {
// 	return Tone.Offline((Transport) => {

// 		const reverb = new Tone.Convolver(buffer).toDestination();
// 		reverb.wet.value = 0.2;

// 		const pannerA = new Tone.Panner(-1).connect(reverb);
// 		const synthA = new Tone.Synth({
// 			envelope: {
// 				attack: 0.01,
// 				decay: 5,
// 				sustain: 0
// 			},
// 			oscillator: {
// 				type: "sawtooth4"
// 			}
// 		}).connect(pannerA);
// 		const seqA = new Tone.Sequence(((time, note) => {
// 			synthA.triggerAttack(note, time);
// 		}), ["A4", "G4", "G#4", "F#4", "E4"], "8n").start(0);
// 		seqA.loop = false;

// 		const pannerB = new Tone.Panner(1).connect(reverb);
// 		const synthB = new Tone.Synth({
// 			envelope: {
// 				attack: 0.001,
// 				decay: 3,
// 				sustain: 0
// 			},
// 			oscillator: {
// 				type: "square8"
// 			}
// 		}).connect(pannerB);
// 		const seqB = new Tone.Sequence(((time, note) => {
// 			synthB.triggerAttack(note, time);
// 		}), ["G#4", "A4", "G4", "F4", "C4"], "8n").start("16n");
// 		seqB.loop = false;

// 		const bass = new Tone.MonoSynth({
// 			envelope: {
// 				attack: 0.01,
// 				decay: 3,
// 				sustain: 0.1
// 			},
// 		}).toDestination();
// 		const bassSeq = new Tone.Sequence(((time, note) => {
// 			bass.triggerAttackRelease(note, "1n", time);
// 		}), ["C2", "C2", "F1", "F1"], "4n").start(0);
// 		bassSeq.loop = false;

// 		Transport.bpm.value = 150;
// 		Transport.start();
// 	}, 7);
// }

// // play the buffer with a Tone.Player when it's been generated
// const player = new Tone.Player().toDestination();

// // bind the interface
// document.querySelector("tone-button").addEventListener("click", e => {
// 	e.target.setAttribute("label", "Rendering...");
// 	e.target.setAttribute("disabled", "");
// 	const buffer = generateAudioOffline().then(buffer => {
// 		document.querySelector("tone-button").setAttribute("label", "Rendered");
// 		player.buffer = buffer;
// 		document.querySelector("tone-play-toggle").removeAttribute("disabled");
// 	});
// });
// document.querySelector("tone-play-toggle").bind(player);
