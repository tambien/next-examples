import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();

// bind the interface
// document.querySelector("tone-transport").bind(Tone.Transport);
// document.querySelector("tone-transport").addEventListener("play", e => {
// 	// enable all of the buttons if it's playing		
// 	Array.from(document.querySelectorAll("tone-button")).forEach(el => {
// 		if (e.detail) {
// 			el.removeAttribute("disabled");
// 		} else {
// 			el.setAttribute("disabled", "");
// 		}
// 	});
// });
// document.querySelector("#at8n").addEventListener("click", e => {
// 	polySynth.triggerAttackRelease("B4", "8n", "@8n");
// });
// document.querySelector("#at4n").addEventListener("click", e => {
// 	polySynth.triggerAttackRelease("E4", "8n", "@4n");
// });
// document.querySelector("#at2n").addEventListener("click", e => {
// 	polySynth.triggerAttackRelease("G3", "8n", "@2n");
// });
// document.querySelector("#at1m").addEventListener("click", e => {
// 	polySynth.triggerAttackRelease("C2", "8n", "@1m");
// });
