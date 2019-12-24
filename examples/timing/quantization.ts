import * as Tone from "tone";
import { html, render } from "lit-html";
import { drawer } from "@tonejs/gui";

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

render(html`
	<style>
		#transportTime {
			line-height: 20px;
			margin-bottom: 20px;
		}
	</style>
	<tone-play-toggle 
		@start=${() => Tone.Transport.start()}
		@stop=${() => Tone.Transport.stop()}
	></tone-play-toggle>
	<div id="transportTime">
		0:0:0
	</div>
	<tone-button disabled @click=${() => synth.triggerAttackRelease("C4", 0.1, "@4n")}>
		@4n
	</tone-button>
	<tone-button disabled @click=${() => synth.triggerAttackRelease("E4", 0.1, "@2n")}>
		@2n
	</tone-button>
	<tone-button disabled @click=${() => synth.triggerAttackRelease("G4", 0.1, "@1m")}>
		@1m
	</tone-button>
`, document.querySelector("#content"));

Tone.Transport.on("start", () => {
	// enable all the buttons on start
	document.querySelectorAll("tone-button").forEach((button: HTMLButtonElement) => button.disabled = false);
});

Tone.Transport.on("stop", () => {
	// disable on stop
	document.querySelectorAll("tone-button").forEach((button: HTMLButtonElement) => button.disabled = true);
});

// update the transport time
function loop() {
	requestAnimationFrame(loop);
	(document.querySelector("#transportTime") as HTMLDivElement).textContent = `position ${Tone.Transport.position}`;
}
loop();

drawer({
	 parent: document.querySelector("#content"),
	 open: false,
}).add({
	tone: synth,
});
