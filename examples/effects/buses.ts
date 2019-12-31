import * as Tone from "tone";
import { html, render } from "lit-html";
import { drawer, ui } from "@tonejs/gui";

// the synth
const synth = new Tone.Synth({
	envelope: {
		attack: 0.04,
	}
});

// make some effects
const chorus = new Tone.Chorus({
	wet: 1,
}).toDestination().start();
const chorusChannel = new Tone.Channel().connect(chorus);
chorusChannel.receive("chorus");

const cheby = new Tone.Chebyshev(50)
	.toDestination();
const chebyChannel = new Tone.Channel().connect(cheby);
chebyChannel.receive("cheby");

const reverb = new Tone.Reverb(3)
	.toDestination();
const reverbChannel = new Tone.Channel().connect(reverb);
reverbChannel.receive("reverb");

// send the synth to all of the channels
const synthChannel = new Tone.Channel().toDestination();
synthChannel.send("chorus");
synthChannel.send("cheby");
synthChannel.send("reverb");
synth.connect(synthChannel);

render(html`
	<tone-piano
		@noteon=${({ detail }) => synth.triggerAttack(detail.name, undefined, detail.velocity)}
		@noteoff=${() => synth.triggerRelease()}
	></tone-piano>
	<tone-slider
		label="chorus send"
		min="-100"
		max="0"
		value="0"
		units="db"
		@input=${({ detail }) => chorusChannel.volume.value = detail.value}
	></tone-slider>
	<tone-slider
		label="reverb send"
		min="-100"
		max="0"
		value="0"
		units="db"
		@input=${({ detail }) => reverbChannel.volume.value = detail.value}
	></tone-slider>
	<tone-slider
		label="chebychev filter send"
		min="-100"
		max="0"
		value="0"
		units="db"
		@input=${({ detail }) => chebyChannel.volume.value = detail.value}
	></tone-slider>
`, document.querySelector("#content"));

drawer({
	parent: document.querySelector("#content"),
	open: false,
}).add({
	tone: chorus,
}).add({
	tone: reverb,
}).add({
	tone: cheby,
});
