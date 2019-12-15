// import { css, html, LitElement, property } from "lit-element";

// customElements.define("tone-meter-vis", class extends LitElement {

// 	name = "hi"

// 	@property({ type: String })
// 	protected bgcolor = "white";
	
// 	@property({ type: String })
// 	protected color = "black";
	
// 	private tone: import("tone").Meter;

// 	bind(tone: import("tone").ToneAudioNode) {
// 		this.tone = tone as import("tone").Meter;
// 		this.loop();
// 	}

// 	private loop() {
// 		requestAnimationFrame(this.loop.bind(this));
// 		const db = this.tone.getValue();
// 		const norm = Math.pow(10, db / 20);
// 		(this.shadowRoot.querySelector("#meter #fill") as HTMLElement).style.width = `${(norm * 100).toFixed(1)}%`;
// 	}

// 	static get styles() {
// 		return css`
// 			#meter {
// 				width: 100%;
// 				height: 10px;
// 			}

// 			#meter #fill {
// 				height: 100%;
// 				width: 50%;
// 				background-color: black;
// 			}
// 		`;
// 	}

// 	render() {
// 		return html`
// 			<div id="meter">
// 				<div id="fill"></div>
// 			</div>
// 		`;
// 	}
// });
