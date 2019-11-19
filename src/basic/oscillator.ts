import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

const osc = new Tone.Oscillator({
	type: "square",
	partialCount: 16,
	frequency: 440,
	volume: -16,
}).toDestination();

// render the interface
render(html`
	<tone-play-toggle 
		@start=${() => osc.start()}
		@stop=${() => osc.stop()}
	></tone-play-toggle>
`, document.querySelector("#content"));

// render the ui
ui({
	tone: osc, 
	parent: document.querySelector("#content")
});
