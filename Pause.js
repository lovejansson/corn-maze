
import { Scene } from "./pim-art/index.js";
import { BASE_URL } from "./config.js";


export default class Pause extends Scene {

    constructor() {
        super();
    }

    async init() {
        this.isInitialized = true;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
    }

}