import * as Tone from "tone";
import { html, render } from "lit-html";
import { drawer } from "@tonejs/gui";
import * as sketch from "p5";

new sketch((p5) => {

	class FunkyShape {
	
		xInc: number
		yInc: number
		xOff: number
		yOff: number
		radius: number
		xPos: number
		yPos: number
		sRadius: number;
	
		/*
		FunkyShape init gives initial and offset values for 
		the perlin noise functions in update.
		Giving different initial values ensures that 
		each funky shape follows its own funky path
		*/
		init(xInc, yInc, xOff, yOff, radius) {
			this.xInc = xInc;
			this.yInc = yInc;
			this.xOff = xOff;
			this.yOff = yOff;
			this.radius = radius;
			this.xPos = 0;
			this.yPos = 0;
		}
		// updates the x, y, and radius values of the shape
		update(envelope) {
			this.xPos = p5.noise(this.xOff) * p5.width;
			this.yPos = p5.noise(this.yOff) * p5.height;
			this.xOff += this.xInc;
			this.yOff += this.yInc;
			this.sRadius = this.radius * envelope;
			return {
				xPos: this.xPos,
				yPos: this.yPos,
				radius: this.sRadius
			};
		};
	}
		
	// using our FunkyShape class
	// to create a funkyCircle class
	const funkyCircle = new FunkyShape();
	
	// creating an empty array
	const funkySquare = [];
	// and populating it with 3 FunkyShapes
	for (let i = 0; i < 3; i++) {
		funkySquare[i] = new FunkyShape();
	}
	
	p5.setup = () => {
		// create a canvas width and height of the screen
		// document.querySelector('canvas')
		p5.createCanvas(300, 300);
		// no fill
		p5.fill(255);
		p5.strokeWeight(1);
		p5.rectMode(p5.CENTER);
		// initializing our funky circle
		funkyCircle.init(0.01, 0.02, 0.0, 0.0, 400);
		// initializing our squares with random values
		// to ensure they don't follow the same path
		for (let i = 0; i < 3; i++) {
			const xInc = Math.random() / 10;
			const yInc = Math.random() / 10;
			funkySquare[i].init(xInc, yInc, 0, 0, 800);
		}
	};
	
	let phase = 0;
	
	p5.draw = () => {
		p5.background(255);
		p5.stroke(0);
		// drawing the kick wave at the bottom
		// it is composed of a simple sine wave that
		// changes in height with the kick envelope
		for (let i = 0; i < p5.width; i++) {
			// scaling kickEnvelope value by 200 
			// since default is 0-1
			const kickValue = kickEnvelope.value * 200;
			// multiplying this value to scale the sine wave 
			// depending on x position
			const yDot = Math.sin((i / 60) + phase) * kickValue;
			p5.point(i, p5.height -150 + yDot);
		}
		// increasing phase means that the kick wave will 
		// not be standing and looks more dynamic
		phase += 1;
		// updating circle and square positions with 
		// bass and bleep envelope values
		const circlePos = funkyCircle.update(bassEnvelope.value);
		// circlePos returns x and y positions as an object
		p5.ellipse(circlePos.xPos, circlePos.yPos, circlePos.radius, circlePos.radius);
		p5.stroke("red");
		for (let i = 0; i < 3; i++) {
			const squarePos = funkySquare[i].update(bleepEnvelope.value);
			p5.rect(squarePos.xPos, squarePos.yPos, squarePos.radius, squarePos.radius);
		}
	};
}, document.querySelector("#page"));

// filtering the hi-hats a bit
// to make them sound nicer
const lowPass = new Tone.Filter({
	frequency: 14000,
}).toDestination();

// we can make our own hi hats with 
// the noise synth and a sharp filter envelope
const openHiHat = new Tone.NoiseSynth({
	volume: -10,
	envelope: {
		attack: 0.01,
		decay: 0.3
	},
}).connect(lowPass);

const openHiHatPart = new Tone.Part(((time) => {
	openHiHat.triggerAttack(time);
}), [{ "8n": 2 }, { "8n": 6 }]).start(0);

const closedHiHat = new Tone.NoiseSynth({
	volume: -10,
	envelope: {
		attack: 0.01,
		decay: 0.15
	},
}).connect(lowPass);

const closedHatPart = new Tone.Part(((time) => {
	closedHiHat.triggerAttack(time);
}), [0, { "16n": 1 }, { "8n": 1 }, { "8n": 3 }, { "8n": 4 }, { "8n": 5 }, { "8n": 7 }, { "8n": 8 }]).start(0);

// BASS
const bassEnvelope = new Tone.AmplitudeEnvelope({
	attack: 0.01,
	decay: 0.2,
	sustain: 0,
}).toDestination();

const bassFilter = new Tone.Filter({
	frequency: 600,
	Q: 8
});

const bass = new Tone.PulseOscillator("A2", 0.4).chain(bassFilter, bassEnvelope);
bass.start();

const bassPart = new Tone.Part(((time, note) => {
	bass.frequency.setValueAtTime(note, time);
	bassEnvelope.triggerAttack(time);
}), [["0:0", "A1"],
	["0:2", "G1"],
	["0:2:2", "C2"],
	["0:3:2", "A1"]]).start(0);

// BLEEP
const bleepEnvelope = new Tone.AmplitudeEnvelope({
	attack: 0.01,
	decay: 0.4,
	sustain: 0,
}).toDestination();

const bleep = new Tone.Oscillator("A4").connect(bleepEnvelope);
bleep.start();

const bleepLoop = new Tone.Loop(((time) => {
			 bleepEnvelope.triggerAttack(time);
}), "2n").start(0);

// KICK
const kickEnvelope = new Tone.AmplitudeEnvelope({
	attack: 0.01,
	decay: 0.2,
	sustain: 0,
}).toDestination();

const kick = new Tone.Oscillator("A2").connect(kickEnvelope).start();

const kickSnapEnv = new Tone.FrequencyEnvelope({
	attack: 0.005,
	decay: 0.01,
	sustain: 0,
	baseFrequency: "A2",
	octaves: 2.7
}).connect(kick.frequency);

const kickPart = new Tone.Part(((time) => {
	kickEnvelope.triggerAttack(time);
	kickSnapEnv.triggerAttack(time);
}), ["0", "0:0:3", "0:2:0", "0:3:1"]).start(0);

// TRANSPORT
Tone.Transport.loopStart = 0;
Tone.Transport.loopEnd = "1:0";
Tone.Transport.loop = true;

render(html`
	<style>
		canvas {
			margin: auto;
			display: block;
		}
	</style>
	<tone-play-toggle
		@start=${() => Tone.Transport.start()}
		@stop=${() => Tone.Transport.stop()}
	></tone-play-toggle>
`, document.querySelector("#content"));

const controls = drawer({
	parent: document.body,
	open: false,
});

controls.folder({
	name: "Hihat"
}).add({
	tone: lowPass,
}).add({
	name: "Open Hihat",
	tone: openHiHat,
}).add({
	name: "Closed Hihat",
	tone: closedHiHat
});

controls.folder({
	name: "Bass"
}).add({
	tone: bassFilter,
}).add({
	tone: bass,
}).add({
	tone: bassEnvelope
});

controls.folder({
	name: "Bleep"
}).add({
	tone: bleep,
}).add({
	tone: bleepEnvelope,
});

controls.folder({
	name: "Kick"
}).add({
	tone: kick,
}).add({
	tone: kickEnvelope,
}).add({
	tone: kickSnapEnv,
});
