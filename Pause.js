
import { Scene } from "./pim-art/index.js";
import { BASE_URL } from "./config.js";


export default class Pause extends Scene {

    constructor() {
        super();
    }

    async init() {
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
       

        ctx.fillStyle ="pink";

        ctx.fillRect(0, 0, this.art.width, this.art.height);
    }

}