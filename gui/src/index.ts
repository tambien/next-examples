import "./component/audio-node";
import "./component/drawer";
import "./component/folder";
import { createElement } from "./component/audio-node";
import { createDrawer } from "./component/drawer";
import { createFolder } from "./component/folder";
export { ToneDrawerElement } from "./component/drawer";
export { ToneFolderElement } from "./component/folder";
export { ToneAudioNodeElement } from "./component/audio-node";

export const ui = (options) => createElement(options);
ui.drawer = createDrawer;
ui.folder = createFolder;
