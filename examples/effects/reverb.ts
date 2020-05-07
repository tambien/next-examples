import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

const reverb = new Tone.Reverb().toDestination();

const player = new Tone.Player({
	url: "/audio/Berklee/shaker_slow_1.mp3",
	loop: true,
	volume: 6,
}).connect(reverb);

render(html`
	<tone-play-toggle 
		@start=${() => player.start()}
		@stop=${() => player.stop()}></tone-play-toggle>
`, document.querySelector("#content"));

ui({
	parent: document.querySelector("#content"),
	tone: reverb
});
