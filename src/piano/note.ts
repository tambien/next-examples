import { css, html, LitElement, property, unsafeCSS } from "lit-element";
import { startContext } from "../util/start";
const style = require("./note.scss");
import { Midi } from "tone";

export class ToneKeyboardNote extends LitElement {

	@property({ type: Number })
	note: number;

	@property({ type: String })
	color = "#eee";

	@property({ type: String })
	activecolor = "white";

	@property({ type: Boolean })
	active = false;

	@property({ type: Number })
	velocity: number;

	@property({ type: Number })
	touchid = -1;

	private _fromMidi(midi: number): string {
		return Midi(midi).toNote();
	}

	updated(changed) {
		if (changed.has("active") && changed.get("active") !== undefined) {
			const eventName = this.active ? "noteon" : "noteoff";
			if (!this.active) {
				this.touchid = -1;
			}
			this.dispatchEvent(new CustomEvent(eventName, {
				detail: {
					name: this._fromMidi(this.note),
					midi: this.note,
					velocity: this.active ? 1 : 0
				},
				composed: true,
				bubbles: true
			}));
		}
	}

	private _mouseover(e: MouseEvent) {
		if (e.buttons) {
			this.active = true;
			this.shadowRoot.querySelector("button").focus();
		}
	}

	private _keydown(e: KeyboardEvent) {
		startContext();
		if (!e.repeat && (e.key === " " || e.key === "Enter")) {
			this.active = true;
		}
	}

	private _keyup(e: KeyboardEvent) {
		if (e.key === " " || e.key === "Enter") {
			this.active = false;
		}
	}

	private _touchstart(e: TouchEvent) {
		e.preventDefault();
		this.touchid = e.touches[0].identifier;
		this.active = true;
	}

	static get styles() {
		return css`${unsafeCSS(style)}`;
	}

	render() {
		const show = this.note !== 0;
		return html`
			<div id="container" ?show=${show}>
				${show ? html`
					<button 
						?active=${this.active}
						@mouseover=${this._mouseover.bind(this)}
						@mouseleave=${() => this.active = false}
						@mousedown=${() => this.active = true}
						@touchstart=${this._touchstart.bind(this)}
						@touchend=${() => this.active = false}
						@mouseup=${() => this.active = false}
						@keydown=${this._keydown.bind(this)}
						@keyup=${this._keyup.bind(this)}
						style="background-color: ${this.active ? this.activecolor : this.color};">
							${this._fromMidi(this.note).replace("#", "♯")}
						</button>` : html``}
			</div>
		`;
	}

}

customElements.define("tone-keyboard-note", ToneKeyboardNote);
