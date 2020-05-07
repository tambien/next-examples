import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

function makeChannel(name, url, pan) {
	const channel = new Tone.Channel({
		pan
	}).toDestination();
	const player = new Tone.Player({
		url: `../audio/Berklee/${url}.mp3`,
		loop: true
	}).sync().start(0);
	player.connect(channel);

	// add a UI element
	ui({
		name,
		tone: channel,
		parent: document.querySelector("#content")
	});
}

render(html`
	<tone-play-toggle
		@start=${() => Tone.Transport.start()}
		@stop=${() => Tone.Transport.stop()}
		></tone-play-toggle>
`, document.querySelector("#content"));

makeChannel("Guitar 0", "comping1", 1);
makeChannel("Guitar 1", "comping2", -1);
makeChannel("Guitar 2", "comping3", 0.25);
makeChannel("Guitar 3", "comping4", -0.25);
