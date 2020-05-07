import * as Tone from "tone";
import { html, render } from "lit-html";

// AutoPanner - a panning modulation effect
const panner = new Tone.AutoPanner({
	frequency: 4,
	depth: 1
}).toDestination().start();

// AutoFilter - a filter modulation effect
const filter = new Tone.AutoFilter({
	frequency: 2,
	depth: 0.6
}).toDestination().start();

// Tremolo - an amplitude modulation effect
const tremolo = new Tone.Tremolo({
	frequency: 0.6,
	depth: 0.7
}).toDestination().start();

// the input oscillators
const pannerOsc = new Tone.Oscillator({ 
	volume: -12,
	type: "square6",
	frequency: "C4"
}).connect(panner);

const filterOsc = new Tone.Oscillator({ 
	volume: -12,
	type: "square6",
	frequency: "E4"
}).connect(filter);

const tremoloOsc = new Tone.Oscillator({ 
	volume: -12,
	type: "square6",
	frequency: "A4"
}).connect(tremolo);

// bind the interface
render(html`
	<style>
		tone-play-toggle {
			display: block;
			margin-top: 40px;
		}
	</style>
	<tone-play-toggle
		@start=${() => pannerOsc.start()}
		@stop=${() => pannerOsc.stop()}
		></tone-play-toggle>
	<tone-slider 
		units="hz"
		value="4"
		step="0.5"
		min="1"
		max="15"
		@input=${e => panner.frequency.value = e.target.value}
		label="AutoPanner"></tone-slider>

	<tone-play-toggle
		@start=${() => filterOsc.start()}
		@stop=${() => filterOsc.stop()}
		></tone-play-toggle>
	<tone-slider 
		units="hz"
		value="4"
		step="0.5"
		min="1"
		max="15"
		@input=${e => filter.frequency.value = e.target.value}
		label="AutoFilter"></tone-slider>

	<tone-play-toggle
		@start=${() => tremoloOsc.start()}
		@stop=${() => tremoloOsc.stop()}
		></tone-play-toggle>
	<tone-slider 
		units="hz"
		value="4"
		step="0.5"
		min="1"
		max="15"
		@input=${e => tremolo.frequency.value = e.target.value}
		label="Tremolo"></tone-slider>
`, document.querySelector("#content"));
