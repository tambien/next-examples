import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

// set the transport
Tone.Transport.bpm.value = 108;
Tone.Transport.loop = true;
Tone.Transport.loopStart = "4m";
Tone.Transport.loopEnd = "8m";

const kick = new Tone.Player({
	url: "/audio/loop/kick.[mp3|ogg]",
	loop: true
}).toDestination().sync().start(0);

const snare = new Tone.Player({
	url: "/audio/loop/snare.[mp3|ogg]",
	loop: true
}).toDestination().sync().start("2n");

const hh = new Tone.Player({
	url: "/audio/loop/hh.[mp3|ogg]",
	loop: true
}).toDestination().sync().start("3:3", "4n"); // start with an offset

render(html`
	<style>
		#daw {
			position: relative;
			width: 100%;
		}

		img {
			width: 100%;
		}

		#progress {
			position: absolute;
			height: 100%;
			width: 2px;
			background-color: black;
			top: 0px;
		}

	</style>
	<tone-play-toggle
		@start=${() => Tone.Transport.start()}
		@stop=${() => Tone.Transport.stop()}
	></tone-play-toggle>
	<div id="daw">
		<img src="../assets/images/drum_loop.png">
		<div id="progress"></div>
	</div>
`, document.querySelector("#content"));

function updateProgress() {
	requestAnimationFrame(updateProgress);
	const element = document.querySelector("#progress") as HTMLElement;
	const percent = Tone.Transport.seconds / (Tone.Transport.loopEnd as number);
	element.style.left = `${(percent * 100).toFixed(2)}%`;
}
updateProgress();
