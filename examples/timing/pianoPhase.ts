import * as Tone from "tone";
import { html, render, svg } from "lit-html";
import { guard } from "lit-html/directives/guard";
import { ui } from "@tonejs/gui";

// set the bpm and time signature first
Tone.Transport.timeSignature = [6, 4];
Tone.Transport.bpm.value = 180;

// a little reverb
const reverb = new Tone.Reverb({
	decay: 0.4,
	wet: 0.3
}).toDestination();

// L/R channel merging
const merge = new Tone.Merge().connect(reverb);

merge.chain(reverb, Tone.Destination);

// the synth settings
const synthSettings = {
	oscillator: {
		detune: 0,
		type: "custom" as "custom",
		partials: [2, 1, 2, 2],
		phase: 0,
		volume: 0
	},
	envelope: {
		attack: 0.005,
		decay: 0.3,
		sustain: 0.2,
		release: 1,
	},
	portamento: 0.01,
	volume: -20
};

// left and right synthesizers
const synthL = new Tone.Synth(synthSettings).connect(merge, 0, 0);
const synthR = new Tone.Synth(synthSettings).connect(merge, 0, 1);

// the two Tone.Sequences
const partL = new Tone.Sequence(((time, note) => {
	synthL.triggerAttackRelease(note, "8n", time);
}), ["E4", "F#4", "B4", "C#5", "D5", "F#4", "E4", "C#5", "B4", "F#4", "D5", "C#5"], "8n").start();

const partR = new Tone.Sequence(((time, note) => {
	synthR.triggerAttackRelease(note, "8n", time);
}), ["E4", "F#4", "B4", "C#5", "D5", "F#4", "E4", "C#5", "B4", "F#4", "D5", "C#5"], "8n").start("2m");

// set the playback rate of the right part to be slightly slower
partR.playbackRate = 0.985;

function updateDOM() {
	requestAnimationFrame(updateDOM);
	const progress = [partL.progress, partR.progress];
	render(html`
		<style>
			#circles {
				display: flex;
			}
			svg {
				flex: 1;
				width: 50%;
				margin: 10px;
				transition: stroke 0.2s;
			}
			svg:nth-child(2) {
				transform: scale(-1, 1);
			}
		</style>
		<tone-play-toggle
			@start=${() => Tone.Transport.start()}
			@stop=${() => Tone.Transport.stop()}
		></tone-play-toggle>
		<div id="circles">
			${progress.map(prog => svg`
				<svg viewBox="0 0 300 300">
					<g transform="translate(50, 50)" fill="none">
					<path
						stroke=${Math.abs(prog - 1) < 0.01 ? "#ED3333" : "#000"}
						stroke-width="40" 
						d="M 200 100 A 100 100 0 
						${(prog * Math.PI * 2 > Math.PI) ? 1 : 0} 
						${(prog * Math.PI * 2 > 0) ? 1 : 0}
						${100 + 100 * Math.cos(prog * Math.PI * 2)}
						${100 + 100 * Math.sin(prog * Math.PI * 2)}"/> 
					</g>
				</svg>
			`)}
		</div>
	`, document.querySelector("#content"));
}
updateDOM();

// draw two circles
// const leftCanvas = document.querySelector("#left") as HTMLCanvasElement;
// const rightCanvas = document.querySelector("#left") as HTMLCanvasElement;
// const leftContext = leftCanvas.getContext("2d");
// const rightContext = rightCanvas.getContext("2d");
// let canvasWidth = leftCanvas.offsetWidth * 2;
// let canvasHeight = leftCanvas.offsetHeight * 2;
// let radius = Math.min(canvasWidth, canvasHeight);

// function sizeCanvas() {
// 	canvasWidth = leftCanvas.offsetWidth * 2;
// 	canvasHeight = leftCanvas.offsetHeight * 2;
// 	radius = Math.min(canvasWidth, canvasHeight) * 0.8;

// 	leftContext.canvas.width = canvasWidth;
// 	leftContext.canvas.height = canvasHeight;

// 	rightContext.canvas.width = canvasWidth;
// 	rightContext.canvas.height = canvasHeight;
// }

// sizeCanvas();

// const twoPi = Math.PI * 2;

// function loop() {
// 	requestAnimationFrame(loop);
// 	leftContext.lineWidth = radius * 0.1;
// 	rightContext.lineWidth = radius * 0.1;
// 	// draw the left progress
// 	leftContext.clearRect(0, 0, canvasWidth, canvasHeight);
// 	leftContext.strokeStyle = "#7F33ED";
// 	leftContext.save();
// 	leftContext.translate(canvasWidth / 2, canvasHeight / 2);
// 	leftContext.rotate(-Math.PI / 2);
// 	leftContext.beginPath();
// 	leftContext.arc(0, 0, radius/2, 0, twoPi * partL.progress, false);
// 	leftContext.stroke();
// 	leftContext.restore();

// 	// draw the left progress
// 	rightContext.clearRect(0, 0, canvasWidth, canvasHeight);
// 	rightContext.strokeStyle = "#1EDF3E";
// 	rightContext.save();
// 	rightContext.translate(canvasWidth / 2, canvasHeight / 2);
// 	rightContext.rotate(-Math.PI / 2);
// 	rightContext.beginPath();
// 	rightContext.arc(0, 0, radius/2, 0, twoPi * partR.progress, false);
// 	rightContext.stroke();
// 	rightContext.restore();
// }
// loop();
