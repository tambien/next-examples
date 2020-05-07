import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

const piano = new Tone.Synth({
	oscillator: {
		type: "fmsine4",
		modulationType: "square"
	}
}).toDestination();

const loop = new Tone.Pattern(((time, note) => {
	piano.triggerAttackRelease(note, "16n", time);

	// Draw.schedule takes a callback and a time to invoke the callback
	Tone.Draw.schedule(() => {
		// the callback synced to the animation frame at the given time
		const noteElement = document.querySelector("#"+note);
		noteElement.classList.add("active");
		setTimeout(() => {
			noteElement.classList.remove("active");
		}, 100);
	}, time);
}), ["C4", "E4", "G4", "B4", "D5"]).start(0);

loop.interval = "16n";
Tone.context.lookAhead = 0.5;

render(html`
	<style>
		#notes{
			width: 100%;
			height: 20px;
			position: relative;
			margin-bottom: 10px;
		}
		.note {
			width: 20%;
			height: 100%;
			position: relative;
			float: left;
			background-color: black;
			opacity: 0;
			transition: opacity 0.5s;
		}
		.note.active {
			opacity: 1;
			transition-duration: 0.1s;
		}
	</style>
	<tone-play-toggle
		@start=${() => Tone.Transport.start()}
		@stop=${() => Tone.Transport.stop()}
	></tone-play-toggle>
	<div id="notes">
		<span class="note" id="C4"></span>
		<span class="note" id="E4"></span>
		<span class="note" id="G4"></span>
		<span class="note" id="B4"></span>
		<span class="note" id="D5"></span>
	</div>
`, document.querySelector("#content"));

ui({
	parent: document.querySelector("#content"),
	tone: piano
});
