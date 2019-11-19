import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

// the player
const player = new Tone.Player({
	url: "../audio/FWDL.[mp3|ogg]",
	loop: true,
	loopStart: 0.5,
	loopEnd: 0.7,
}).toDestination();

// render the interface
render(html`
	<tone-play-toggle 
		@start=${() => player.start()}
		@stop=${() => player.stop()}
	></tone-play-toggle>
`, document.querySelector("#content"));

// render the ui
ui({
	tone: player, 
	parent: document.querySelector("#content")
});
