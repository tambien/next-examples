import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

// the feedback delay
const feedbackDelay = new Tone.PingPongDelay({
	delayTime: "8n",
	feedback: 0.6,
	wet: 0.5
}).toDestination();

// play a snare sound through it
const player = new Tone.Player("./audio/505/snare.[mp3|ogg]").connect(feedbackDelay);

render(html`
	<tone-momentary-button
		@down=${() => player.start()}
		@up=${() => player.stop()}></tone-momentary-button>
	
`, document.querySelector("#content"));

ui({
	tone: feedbackDelay,
	parent: document.querySelector("#content")
});
