import * as Tone from "tone";
import { html, render } from "lit-html";
import { ui } from "@tonejs/gui";

const player = new Tone.Player({
	url: "./audio/FWDL.[mp3|ogg]",
	loop: true
}).toDestination();

// bind the interface
// document.querySelector("tone-play-toggle").bind(player);
// document.querySelector("tone-meter").bind(player);
// document.querySelector("tone-player").bind(player);
