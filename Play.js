import { Scene } from "./pim-art/index.js";
import { BASE_URL } from "./config.js";
import { createMazePrim,createTileMap } from "./maze.js";

export default class Play extends Scene {

    constructor() {
        super();
    }

    async init() {
        this.art.images.add("background", `${BASE_URL}assets/images/dirt-background.png`);
        this.art.images.add("corn", `${BASE_URL}assets/images/corn.png`);
        this.art.images.load();
        const maze = createMazePrim(7, 19);

        this.mazeMap = createTileMap(maze);
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

        // Draw the corn 

        for(let r = 0; r <12; ++r) {
     
            ctx.drawImage(this.art.images.get("corn"),-this.art.tileSize / 2, r * (this.art.tileSize * 2) - this.art.tileSize);
            ctx.drawImage(this.art.images.get("corn"), 39 * this.art.tileSize + this.art.tileSize / 2, r * (this.art.tileSize * 2) - this.art.tileSize);
           
        }

        const colDiff = this.art.tileSize  / 2;
        const rowDiff = 0;

        for(let r = 0; r < this.mazeMap.length; ++r) {
            for(let c = 0; c < this.mazeMap[r].length; ++c) {
                if(this.mazeMap[r][c] === 1) {
                    ctx.drawImage(this.art.images.get("corn"), 
                    c * this.art.tileSize + colDiff, 
                    r * (this.art.tileSize * 1.5) + rowDiff);
                } else {
                    ctx.fillRect(c * this.art.tileSize + this.art.tileSize / 2 , r * this.art.tileSize * 1.5 + this.art.tileSize / 2 , this.art.tileSize,this.art.tileSize * 2)
                }
            }
        }
    
    }

}