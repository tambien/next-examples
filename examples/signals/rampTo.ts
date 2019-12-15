import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

const oscillators = [];

const bassFreq = 32;

for (let i = 0; i < 8; i++) {
	oscillators.push(new Tone.Oscillator({
		frequency: bassFreq * i,
		type: "sawtooth10",
		volume: -Infinity,
		detune: Math.random() * 30 - 15,
	}).toDestination());
}

function start() {
	oscillators.forEach(o => {
		o.start();
		o.volume.rampTo(-20, 1);
	});
}

function stop() {
	oscillators.forEach(o => {
		o.volume.rampTo(-Infinity, 1);
		o.stop("+1");
	});
}

function setFrequency(e) {
	oscillators.forEach((osc, i) => {
		osc.frequency.rampTo(bassFreq * i * e.detail.value, 0.4);
	});
}

render(html`
	<tone-play-toggle
		@start=${start}
		@stop=${stop}
	></tone-play-toggle>
	<tone-slider
		label="harmonicity"
		min="0.5"
		max="2.0"
		step="0.1"
		value="1"
		@input=${setFrequency}
	></tone-slider>
`, document.querySelector("#content"));
