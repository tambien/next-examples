import * as Tone from "tone";

// setup a polyphonic sampler
const keys = new Tone.Players({
	urls: {
		A: "A1.[mp3|ogg]",
		"C#": "Cs2.[mp3|ogg]",
		E: "E2.[mp3|ogg]",
		"F#": "Fs2.[mp3|ogg]",
	},
	volume: -10,
	fadeOut: "64n",
	baseUrl: "./audio/casio"
}).toDestination();

// the notes
const noteNames = ["F#", "E", "C#", "A"];

const loop = new Tone.Sequence(((time, col) => {
	// @ts-ignore
	const column = document.querySelector("tone-step-sequencer").currentColumn;
	column.forEach((val, i) => {
		if (val) {
			keys.player(noteNames[i]).start(time, 0, "32n");
		}
	});
	// set the columne on the correct draw frame
	Tone.Draw.schedule(() => {
		// @ts-ignore
		// document.querySelector("tone-step-sequencer").setAttribute("highlight", col);
	}, time);
}), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n").start(0);

// bind the interface
// @ts-ignore
// document.querySelector("tone-transport").bind(Tone.Transport);

Tone.Transport.on("stop", () => {
	setTimeout(() => {
		// @ts-ignore
		// document.querySelector("tone-step-sequencer").setAttribute("highlight", "-1");
	}, 100);
});
