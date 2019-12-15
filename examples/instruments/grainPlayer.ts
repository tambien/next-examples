import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

// the player
const player = new Tone.GrainPlayer({
	// url: "../audio/Berklee/resonating_harmonics_2.mp3",
	// url: "../audio/Berklee/arpeggio3crazy.mp3",
	url: "../audio/Berklee/FlavioGaete44/TQT41.mp3",
	loop: true,
	grainSize: 0.1,
	overlap: 0.05,
}).toDestination();

render(html`
	<tone-play-toggle 
		@start=${() => player.start()}
		@stop=${() => player.stop()}
	></tone-play-toggle>
`, document.querySelector("#content"));

ui({
	tone: player,
	name: "GrainPlayer",
	parent: document.querySelector("#content")
});
