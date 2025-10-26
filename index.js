import { Art } from "./pim-art/index.js";
import { createDebugLogger } from "./debugger.js";
import Play from "./Play.js";
import Pause from "./Pause.js";

const playerEl = document.querySelector("art-player");
const iconMoon = document.querySelector("#icon-moon");
const iconSun = document.querySelector("#icon-sun");
const btnDayNight = document.querySelector("#btn-day-night");

if (playerEl === null) throw new Error("Missing DOM: art-player");

export const debug = createDebugLogger(true);
export let isNight = false;

const art = new Art({
    pause: new Pause(),
    play: new Play(),
    width: 640,
    height: 360,
    tileSize: 16,
    canvas: "#canvas-art",
    displayGrid: false,

});

art.start().then(() => {
    playerEl.addEventListener("pause", async() => {
        await art.pause();
    });

    playerEl.addEventListener("play", async() => {
        await art.play();
    });

    playerEl.addEventListener("volume", (e) => {
        art.audio.setVolume(e.detail.volume / 100)
    });

    btnDayNight.addEventListener("click", () => {

        isNight = !isNight;

        if(isNight) {
            iconMoon.style.display = "block";
            iconSun.style.display = "none";
        } else {
            iconMoon.style.display = "none";
            iconSun.style.display = "block";
        }
    })

    addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Spacebar") {
            e.preventDefault();
            togglePlayPause();
        } else if (e.key === "f" || e.key === "F") {
            art.enterFullScreen();
        } else if(e.key === "n" || e.key === "N") {
                isNight = !isNight;

        if(isNight) {
            iconMoon.style.display = "block";
            iconSun.style.display = "none";
        } else {
            iconMoon.style.display = "none";
            iconSun.style.display = "block";
        }
        }
    });

    /**
     * Communication from parent document (pimpixels): 
     * 
     * F/f keydown events is relayed here via message "enter-fullscreen".
     * Space keydown events is relayed here via message "toggle-play-pause".
     * If art loses focus by clicking outside of it the active element should be blurred.
     * 
     */
    addEventListener("message", (event) => {
        const data = event.data;
        if (data.action === "toggle-play-pause") {
            togglePlayPause();
        } else if (data.action === "enter-fullscreen") {
            art.enterFullScreen();
        } else if (data.action === "art-lost-focus") {
            if (document.activeElement !== null) document.activeElement.blur();
        }
    });

});


function togglePlayPause() {
    if (playerEl.isOn) {
        playerEl.pause();
    } else {
        playerEl.play();
    }
}