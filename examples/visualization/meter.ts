import * as Tone from "tone";
import { html, render } from "lit-html";
import { meter } from "@tonejs/gui";

const levelMeter = new Tone.Meter({
	channels: 2,
});

const player = new Tone.Player({
	url: "/audio/Berklee/random_analogsynth2.mp3",
	loop: true
}).toDestination().connect(levelMeter);

render(html`
	<tone-momentary-button
		@down=${() => player.start()}
		@up=${() => player.stop()}></tone-momentary-button>
	
`, document.querySelector("#content"));

meter({
	tone: levelMeter,
	parent: document.querySelector("#content"),
	height: 60,
});
