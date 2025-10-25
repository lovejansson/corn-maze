import { Art } from "./pim-art/index.js";
import { createDebugLogger } from "./debugger.js";

export const debug = createDebugLogger(true);

const art = new Art({ 
    pause: new Pause(),
    play: new Play(),
    width: 320,
    height: 180,
    tileSize: 16,
    canvas: "#canvas-art",
    displayGrid: false
});
