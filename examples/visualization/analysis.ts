import * as Tone from "tone";
import { html, render } from "lit-html";
import { fft, waveform } from "@tonejs/gui";

const eq = new Tone.FFT();
const oscilloscope = new Tone.Waveform();

const player = new Tone.Player({
	url: "/audio/FWDL.[mp3|ogg]",
	loop: true
}).toDestination().fan(eq, oscilloscope);

render(html`
	<tone-play-toggle
		@start=${() => player.start()}
		@stop=${() => player.stop()}
	></tone-play-toggle>
`, document.querySelector("#content"));

fft({
	parent: document.querySelector("#content"),
	tone: eq,
	height: 60,
});

waveform({
	parent: document.querySelector("#content"),
	tone: oscilloscope,
	height: 60,
});

// connect the UI with the components
// document.querySelector("tone-player").bind(player);
// document.querySelector("tone-play-toggle").bind(player);
// document.querySelector("tone-oscilloscope").bind(player);
// document.querySelector("tone-fft").bind(player);
