import { Scene } from "./pim-art/index.js";
import { BASE_URL } from "./config.js";
import { createMazePrim } from "./maze.js";
import { night } from "./canvasManipulation.js"
import { isNight } from "./index.js"


export default class Pause extends Scene {

    constructor() {
        super();
    }

    async init() {
        this.art.images.add("background", `${BASE_URL}assets/images/dirt-background.png`);
        this.art.images.add("corn", `${BASE_URL}assets/images/corn.png`);
        this.art.images.add("scare-crow", `${BASE_URL}assets/images/scare-crow.png`);
        await this.art.images.load();
        this.maze = createMazePrim(7, 19, {start: { row: 2, col: 8}, rows: 2, cols: 3});
    }

    start() {


    }

    stop() {

    }

    update() {

    }


    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
     
        ctx.drawImage(this.art.images.get("background"), 0, 0);

        // Draw the corn maze

        for (let r = 0; r < 12; ++r) {

            ctx.drawImage(this.art.images.get("corn"), -this.art.tileSize / 2, r * (this.art.tileSize * 2) - this.art.tileSize);
            ctx.drawImage(this.art.images.get("corn"), 39 * this.art.tileSize + this.art.tileSize / 2, r * (this.art.tileSize * 2) - this.art.tileSize);

        }

        const colDiff = this.art.tileSize / 2;
        const rowDiff = 0;
    

        for (let r = 0; r < this.maze.length; ++r) {
            for (let c = 0; c < this.maze[r].length; ++c) {
                if (this.maze[r][c] === 1) {
                    ctx.drawImage(this.art.images.get("corn"),
                        c * this.art.tileSize + colDiff,
                        r * (this.art.tileSize * 1.5) + rowDiff);
                } else {
                    // ctx.fillRect(c * this.art.tileSize + this.art.tileSize / 2,
                    //     r * this.art.tileSize * 1.5 + this.art.tileSize / 2,
                    //     this.art.tileSize,
                    //     this.art.tileSize)
                }
            }
        }

        ctx.drawImage(this.art.images.get("scare-crow"), this.art.tileSize * 19, this.art.tileSize * 9)

        if (isNight) {
            night(ctx);
        }
 
    }

}