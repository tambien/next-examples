import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

const merge = new Tone.Merge().toDestination();

// two oscillators panned hard left / hard right
const rightOsc = new Tone.Oscillator({
	type: "sawtooth",
	volume: -20
}).connect(merge, 0, 1);

const leftOsc = new Tone.Oscillator({
	type: "square",
	volume: -20
}).connect(merge, 0, 0);

// create an oscillation that goes from 0 to 1200
// connection it to the detune of the two oscillators
const detuneLFO = new Tone.LFO({
	type: "square",
	min: 0,
	max: 1200
}).fan(rightOsc.detune, leftOsc.detune).start();

// the frequency signal
const frequency = new Tone.Signal(0.5);

// the move the 0 to 1 value into frequency range
const scale = new Tone.ScaleExp(110, 440);
		
// multiply the frequency by 2.5 to get a 10th above
const mult = new Tone.Multiply(2.5);
		
// chain the components together
frequency.chain(scale, mult);
scale.connect(rightOsc.frequency);
mult.connect(leftOsc.frequency);

// multiply the frequency by 2 to get the octave above
const detuneScale = new Tone.Scale(14, 4);
frequency.chain(detuneScale, detuneLFO.frequency);		

function start() {
	rightOsc.start();
	leftOsc.start();
}

function stop() {
	rightOsc.stop();
	leftOsc.stop();
}

function setFrequency(e) {
	frequency.rampTo(e.detail.value, 0.1);
}

render(html`
	<tone-play-toggle
		@start=${start}
		@stop=${stop}
	></tone-play-toggle>
	<tone-slider
		label="modulation rate"
		min="0.1"
		max="1"
		step="0.1"
		value="1"
		@input=${setFrequency}
	></tone-slider>
`, document.querySelector("#content"));
