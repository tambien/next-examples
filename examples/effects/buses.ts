import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

// the synth
const synth = new Tone.Synth({
	envelope: {
		attack: 0.04,
	}
}).toDestination();

// make some effects
// const chorus = new Tone.Chorus()
// 	.receive("chorus")
// 	.toDestination();

// const cheby = new Tone.Chebyshev(50)
// 	.receive("cheby")
// 	.toDestination();

// const reverb = new Tone.Freeverb(0.8, 4000)
// 	.receive("reverb")
// 	.toDestination();

// send audio to each of the effect channels
// const chorusSend = synth.send("chorus", -Infinity);
// const chebySend = synth.send("cheby", -Infinity);
// const reverbSend = synth.send("reverb", -Infinity);

// // bind the interface
// document.querySelector("tone-chorus").bind(chorus);
// document.querySelector("tone-chebyshev").bind(cheby);
// document.querySelector("tone-freeverb").bind(reverb);
// document.querySelector("tone-synth").bind(synth);
// document.querySelector("tone-piano").bind(synth);
