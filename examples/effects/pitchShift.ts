import * as Tone from "tone";
import { html, render } from "lit-html";

const player = new Tone.Player("/audio/Berklee/bowed_cymbal_2.mp3");
player.loop = true;
const pitchShift = new Tone.FrequencyShifter();

player.connect(pitchShift);
pitchShift.toDestination();

render(html`
	<tone-play-toggle 
		@start=${() => player.start()}
		@stop=${() => player.stop()}></tone-play-toggle>
	<tone-slider 
		units="hz"
		value="0"
		min="-100"
		max="100"
		@input=${e => pitchShift.frequency.value = e.target.value}
		label="frequency"></tone-slider>
`, document.querySelector("#content"));
