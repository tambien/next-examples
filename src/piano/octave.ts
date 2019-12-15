import { css, html, LitElement, property, unsafeCSS } from "lit-element";
import { ToneKeyboardNote } from "./note";
const style = require("./octave.scss");

export class ToneKeyboardOctave extends LitElement {

	@property({ type: Number })
	octave = 1;

	noteon(number) {
		const note = this.shadowRoot.querySelector(`tone-keyboard-note[note="${number}"]`) as ToneKeyboardNote;
		note.active = true;
	}

	noteoff(number) {
		const note = this.shadowRoot.querySelector(`tone-keyboard-note[note="${number}"]`) as ToneKeyboardNote;
		note.active = false;	
	}

	getNoteByTouchId(id) {
		const notes = Array.from(this.shadowRoot.querySelectorAll("tone-keyboard-note")) as ToneKeyboardNote[];
		const element = notes.find((e) => e.touchid === id);
		if (element && element.note) {
			return element;
		}
	}

	static get styles() {
		return css`${unsafeCSS(style)}`;
	}

	render() {
		const startNote = 12 * this.octave;
		const whiteNotes = [0, 2, 4, 5, 7, 9, 11].map(i => i + startNote);
		const blackNotes = [0, 1, 3, 0, 6, 8, 10, 0].map(i => {
			if (i) {
				return i + startNote;
			} else {
				return 0;
			}
		});
		return html`
			<div id="container">
				<div id="white-notes">
				${whiteNotes.map(note => html`
					<tone-keyboard-note color="#aaa" note="${note.toString()}"></tone-keyboard-note>
				`)}
				</div>
				<div id="black-notes">
				${blackNotes.map(note => html`
					<tone-keyboard-note color="black" note="${note.toString()}"></tone-keyboard-note>
				`)}
				</div>
			</div>
		`;
	}

}

customElements.define("tone-keyboard-octave", ToneKeyboardOctave);
