import { css, html, LitElement, unsafeCSS } from "lit-element";
const WebMidi: import("webmidi").WebMidi = require("webmidi");
const style = require("./midi-in.scss");

export class ToneMidiIn extends LitElement {

	private _flashTimeout = -1;

	constructor() {
		super();

		WebMidi.enable(e => {
			if (!e) {
				WebMidi.addListener("connected", e => {
					if (e.port.type === "input") {
						this.requestUpdate();
					}
				});
				WebMidi.addListener("disconnected", e => {
					this.requestUpdate();
				});
			}
		});
	}

	_flash() {
		clearTimeout(this._flashTimeout);
		const light = this.shadowRoot.querySelector("#light");
		light.classList.add("flash");
		this._flashTimeout = setTimeout(() => light.classList.remove("flash"), 100) as unknown as number;
	}

	_connectMidi(event) {
		if (event.target.value === "none") {
			this.shadowRoot.querySelector("#light").classList.remove("connected");
			return;
		} else {
			this.shadowRoot.querySelector("#light").classList.add("connected");
		}
		const input = WebMidi.getInputById(event.target.value);
		if (input) {
			input.addListener("noteon", "all", e => {
				const name = `${e.note.name}${e.note.octave}`;
				const midi = e.note.number;
				this._flash();
				this.dispatchEvent(new CustomEvent("noteon", {
					detail: {
						name, midi, 
						velocity: e.velocity
					},
					composed: true,
					bubbles: true
				}));
			});
			input.addListener("noteoff", "all", e => {
				const name = `${e.note.name}${e.note.octave}`;
				const midi = e.note.number;
				this._flash();
				this.dispatchEvent(new CustomEvent("noteoff", {
					detail: {
						name, midi, 
						velocity: e.velocity
					},
					composed: true,
					bubbles: true
				}));
			});
	
			input.addListener("controlchange", "all", e => {
				this._flash();
				/* if (e.controller.name === 'holdpedal'){
						const down = e.value > 0
						this.emit('pedal', { down, originalEvent : e })
					} */
			});
		}
	}
	
	static get styles() {
		return css`${unsafeCSS(style)}`;
	}

	render() {
		if (WebMidi.supported) {
			return html`
				<div id="container">
					<div id="light"></div>
					<label>MIDI IN:</label>
					<select @change=${this._connectMidi.bind(this)}>
						<option value="none">none</option>
						${WebMidi.inputs.map(input => html`
							<option value=${input.id}>${input.name}</option>
						`)}
					</select>
				</div>
			`;
		} else {
			return html``;
		}
	}
}

customElements.define("tone-midi-in", ToneMidiIn);
