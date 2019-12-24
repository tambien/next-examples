import * as Tone from "tone";
import { html, render } from "lit-html";

const keys = new Tone.Players({
	urls: {
		0: "A1.mp3",
		1: "Cs2.mp3",
		2: "E2.mp3",
		3: "Fs2.mp3",
	},
	volume: -8,
	fadeOut: "64n",
	baseUrl: "/audio/casio/"
}).toDestination();

render(html`
	<tone-play-toggle 
		@start=${() => Tone.Transport.start()}
		@stop=${() => Tone.Transport.stop()}
	></tone-play-toggle>
	<tone-step-sequencer
		rows="4"
		columns="16"
		subdivision="16n"
		@trigger=${({ detail }) => keys.player(detail.row).start(detail.time, 0, "16t")}
	></tone-step-sequencer>
`, document.querySelector("#content"));
