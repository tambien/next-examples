import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

// make the noise and connect it to the output
const noise = new Tone.Noise({
	volume: -10,
	type: "brown"
}).toDestination();

// render the interface
render(html`
	<tone-momentary-button 
		@down=${() => noise.start()}
		@up=${() => noise.stop()}
	></tone-momentary-button>
`, document.querySelector("#content"));

// render the ui
ui({
	tone: noise, 
	parent: document.querySelector("#content")
});
