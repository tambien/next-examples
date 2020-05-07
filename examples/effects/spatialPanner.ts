import * as Tone from "tone";
import { html, render } from "lit-html";

function setRotation(angle) {
	Tone.Listener.forwardX.value = Math.sin(angle);
	Tone.Listener.forwardY.value = 0;
	Tone.Listener.forwardZ.value = -Math.cos(angle);
}

render(html`
	<tone-play-toggle 
		@start=${() => Tone.Transport.start()}
		@stop=${() => Tone.Transport.stop()}
	></tone-play-toggle>
	<tone-slider 
		label="x"
		min="-2"
		max="2"
		value="0"
		@input=${e => Tone.Listener.positionX.value = e.target.value}
	></tone-slider>
	<tone-slider 
		label="z"
		min="-2"
		max="2"
		value="0"
		@input=${e => Tone.Listener.positionZ.value = e.target.value}
	></tone-slider>
	<tone-slider 
		label="rotation"
		min="0"
		max="${(Math.PI * 2).toFixed(2)}"
		value="0"
		units="rad"
		@input=${e => setRotation(e.target.value)}
	></tone-slider>
`, document.querySelector("#content"));

function createPlayerPlusPanner(url, positionX, positionY, positionZ) {
	const panner = new Tone.Panner3D({
		panningModel: "HRTF",
		positionX,
		positionY,
		positionZ,
	}).toDestination();
	
	const player = new Tone.Player({
		url,
		loop: true,
	}).connect(panner).sync().start(0);
}

createPlayerPlusPanner("/audio/Berklee/taps_1c.mp3", 2, 0, 0);
createPlayerPlusPanner("/audio/Berklee/tinkle3.mp3", 0, 0, 2);
createPlayerPlusPanner("/audio/Berklee/tapping1.mp3", -2, 0, 2);
createPlayerPlusPanner("/audio/Berklee/thump1.mp3", -2, 0, -2);
