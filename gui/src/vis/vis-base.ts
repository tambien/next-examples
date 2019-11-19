import { html, LitElement, property } from "lit-element";

export abstract class VisBase extends LitElement {

	@property({ type: String })
	protected bgcolor = "white";
	
	@property({ type: String })
	protected color = "black";

	protected normalizeCurve = true;
	private timeout: number;
	protected width = 300
	protected height = 100

	protected scale(v: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
		return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
	}

	protected abstract async generate();
	
	async draw(values: Float32Array, async = false) {
		const canvas = this.shadowRoot.querySelector("canvas");
		const context = canvas.getContext("2d");
		canvas.height = this.height;
		canvas.width = this.width;
		// canvas.width = canvas.width
		// canvas.height = canvas.offsetHeight
		const width = canvas.width;
		const height = canvas.height;
		context.clearRect(0, 0, width, height);
		const max = this.normalizeCurve ? Math.max(...values) * 1.1 : 1;
		const min = this.normalizeCurve ? Math.min(...values) * 1.1 : 0;
	
		const lineWidth = 3;
		context.lineWidth = lineWidth;
		context.beginPath();
		for (let i = 0; i < values.length; i++) {
			const v = values[i];
			const x = this.scale(i, 0, values.length, lineWidth, width-lineWidth);
			const y = this.scale(v, max, min, 0, height-lineWidth);
			if (i === 0) {
				context.moveTo(x, y);
			} else {
				context.lineTo(x, y);
			}
			if (async && i % 44100 === 0) {
				context.lineCap = "round";
				context.strokeStyle = "black";
				context.stroke();
				await new Promise(done => setTimeout(done, 1));
			}
		}
		context.lineCap = "round";
		context.strokeStyle = "black";
		context.stroke();
	}

	updated() {
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.generate();
		}, 50) as unknown as number;
	}

	render() {
		return html`
			<style>
				#container {
					margin-top: 5px;
				}

				canvas {
					width: 100%;
					height: ${this.height}px;
				}
			</style>
			<div id="container">
				<canvas></canvas>
			</div>
		`;
	}
}
