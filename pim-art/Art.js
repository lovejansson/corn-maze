import AudioPlayer from "./AudioPlayer.js";
import ImagesManager from "./ImagesManager.js";

/**
 * @typedef {import("./Scene.js").Scene} Scene
 */

/**
 * @typedef ArtConfig
 * 
 * @property {number} width
 * @property {number} height
 * @property {tileSize} tileSize 
 * @property {Scene} play
 * @property {Scene} pause
 * @property {string} canvas 
 * @property {number} [frameRate]
 * @property {{}} [services] 
 */

const FRAME_RATE_DEFAULT = 120; 
const CANVAS_SELECTOR_DEFAULT = "canvas";

/**
 * @description The main class for managing the art piece; switching between the play and pause scenes, loading assets, and managing services like images and audio. 
 */
export default class Art {

    /**
     * @type {boolean}
     */
    isPlaying;

    /**
     * @type {ImagesManager}
     */
    images;

    /**
     * @type {AudioPlayer}
     */
    audio;

    /**
     *  @type {ArtConfig}
     */
    config;

    /**
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * @param {ArtConfig} config 
     */
    constructor(config) {

        this.images = new ImagesManager();
        this.audio = new AudioPlayer();
        this.isPlaying = false;
        this.config = config;
        this.elapsedAcc = 0; 
        this.elapsedPrev = 0; 
        this.width = config.width;
        this.height = config.height;
        this.tileSize = config.tileSize;
    }

    enterFullScreen(){
         const container = document.querySelector("body");

        if(!container) throw new Error("art container not found");

        if(document.fullscreenElement === null) {
            container.requestFullscreen();

        } else {
            console.warn("An element is already in fullscreen mode: ", document.fullscreenElement);
        }
    }


    async start() {
        await this.#init();
        this.#privatePlay();
    }

    /**
     * @param {boolean} val
     */
    async play() {
        this.audio.onOffSwitch();
        this.config.play.start();
        this.config.pause.stop();
        this.isPlaying = true;
    }

    async pause() {
        this.config.pause.start();
        this.config.play.stop();
        this.audio.onOffSwitch();
        this.isPlaying = false;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    async #privatePlay(elapsed = 0) {

        this.elapsedAcc = (this.elapsedAcc || 0) + elapsed - this.elapsedPrev;
  
        if(this.elapsedAcc >= (1000 / (this.config.frameRate || FRAME_RATE_DEFAULT))) {

            if (this.isPlaying) {

                const currentTransform = this.ctx.getTransform();
                this.ctx.clearRect(0 - currentTransform.e, 0 - currentTransform.f, this.width, this.height);

                this.config.play.update();
                this.config.play.draw(this.ctx);

            } else {

                const currentTransform = this.ctx.getTransform();

                this.ctx.clearRect(0 - currentTransform.e, 0 - currentTransform.f, this.width, this.height);
            
                this.config.pause.update();
                this.config.pause.draw(this.ctx);
            }

            this.elapsedAcc = 0;
        }

        this.elapsedPrev = elapsed;
        requestAnimationFrame((elapsed) => this.#privatePlay(elapsed));
    }

    async #init() {

        const  ctx = this.#initCanvas(this.config.canvas || CANVAS_SELECTOR_DEFAULT);
        this.ctx = ctx;

        this.config.play.art = this; 
        this.config.pause.art = this; 
        await this.config.play.init();
        await this.config.pause.init();

    }

    #initCanvas(selector) {
        const canvas = document.querySelector(selector);

        if (canvas === null) {
            console.error("canvas is null");
            throw new Error("canvas is null");
        }

        const ctx = canvas.getContext("2d");

        if (ctx === null) {
            console.error("ctx is null");
            throw new Error("ctx is null");
        }

        canvas.width = this.width;
        canvas.height = this.height;

        ctx.imageSmoothingEnabled = true; // For smooth scaling of images so that pixel art doesn't look blurry.

        return ctx;

    }
}