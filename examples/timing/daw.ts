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
	<tone-play-toggle
		@start=${() => Tone.Transport.start()}
		@stop=${() => Tone.Transport.stop()}
	></tone-play-toggle>
`, document.querySelector("#content"));

// bind the transport
// document.querySelector("tone-play-toggle").bind(Tone.Transport);
// document.querySelector("tone-position").bind(Tone.Transport);
// document.querySelector("tone-position").addEventListener("position", e => {
// 	document.querySelector("#progress").style = `left: ${e.detail*100}%`;
// });
