import { Scene } from "./pim-art/index.js";
import { BASE_URL } from "./config.js";


export default class Play extends Scene {

    constructor() {
        super();
    }

    async init() {
        this.isInitialized = true;
    }

    update() {
    }


    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {}

}