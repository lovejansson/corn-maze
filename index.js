import { Art } from "./pim-art/index.js";
import { createDebugLogger } from "./debugger.js";
import Play from "./Play.js";
import Pause from "./Pause.js";

export const debug = createDebugLogger(true);

const art = new Art({ 
    pause: new Pause(),
    play: new Play(),
    width: 640,
    height: 360,
    tileSize: 16,
    canvas: "#canvas-art",
    displayGrid: false
});


art.play()