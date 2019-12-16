import * as Tone from "tone";
import { html, render } from "lit-html";
import { meter, ui } from "@tonejs/gui";

// the feedback delay
const feedbackDelay = new Tone.PingPongDelay({
	delayTime: "8n",
	feedback: 0.6,
	wet: 1,
}).toDestination();

// play a snare sound through it
const player = new Tone.Player("/audio/505/snare.[mp3|ogg]").connect(feedbackDelay);

const levelMeter = new Tone.Meter({
	channels: 2,
	normalRange: true,
	smoothing: 0.5,
});

feedbackDelay.connect(levelMeter);

render(html`
	<tone-momentary-button
		@down=${() => player.start()}
		@up=${() => player.stop()}></tone-momentary-button>
	
`, document.querySelector("#content"));

ui({
	tone: feedbackDelay,
	parent: document.querySelector("#content")
});

meter({
	tone: levelMeter,
	parent: document.querySelector("#content"),
	height: 60,
});
