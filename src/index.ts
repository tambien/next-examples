import "./input/play-toggle";
export { TonePlayToggle } from "./input/play-toggle";

import "./input/slider";
export { ToneSlider } from "./input/slider";

import "./input/momentary-button";
export { ToneMomentaryButton } from "./input/momentary-button";

import "./interface/mute";
export { ToneMuteButton } from "./interface/mute";

import "./input/mic-button";
export { ToneMicButton } from "./input/mic-button";

import "./interface/loader";
export { ToneLoader } from "./interface/loader";

import "./piano/piano";
export { TonePiano } from "./piano/piano";

window.addEventListener("load", () => {
	// make sure that @material/mwc-icons is available
	if (!customElements.get("mwc-icon")) {
		import("@material/mwc-icon");
	}
	
	(document.querySelector("mwc-icon-button") as HTMLElement).addEventListener("click", () => {
		const drawer = (document.querySelector("mwc-drawer") as Drawer);
		drawer.open = !drawer.open;
	});
});

import "@material/mwc-drawer";
import { Drawer } from "@material/mwc-drawer";
import "@material/mwc-icon-button";
import "@material/mwc-top-app-bar";
import "@material/mwc-icon-button-toggle";

