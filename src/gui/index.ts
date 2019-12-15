import "./component/audio-node";
import "./component/drawer";
import "./component/folder";
import { createElement, ElementOptions } from "./component/audio-node";
import { createDrawer } from "./component/drawer";
import { createFolder } from "./component/folder";
import { createWaveform } from "./vis/waveform";
import { createFFT } from "./vis/fft";
export { ToneDrawerElement } from "./component/drawer";
export { ToneFolderElement } from "./component/folder";
export { ToneAudioNodeElement } from "./component/audio-node";

export const ui = createElement;
export const drawer = createDrawer;
export const folder = createFolder;
export const waveform = createWaveform;
export const fft = createFFT;
