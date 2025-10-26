/**
 * Canvas manipulations with the getImageData method.
 */


/**
 * Creates night mode for canvas
 * 
 * @param {CanvasRenderingContext2D} ctx
 */
function night(ctx) {

    modPixels(ctx, ({ r, g, b, a }) => {
        return { r: Math.max(0, r - 75), g: Math.max(0, g - 75), b: Math.max(0, b - 75), a }
    });
}

/**
 * Iterates through each pixel in the canvas and lets the user modify it via a callback function. 
 * 
 * @param {CanvasRenderingContext2D} ctx
 * @param {(pixel: {r: number, g: number, b: number, a: number}) => {r: number, g: number, b: number, a: number}} cb
 */
function modPixels(ctx, cb) {
    const canvasCopy = document.createElement("canvas");

    canvasCopy.width = ctx.canvas.width;
    canvasCopy.height = ctx.canvas.height;

    const ctxCopy = canvasCopy.getContext("2d", { willReadFrequently: true });

    ctxCopy.drawImage(ctx.canvas, 0, 0);

    const imageData = ctxCopy.getImageData(0, 0, canvasCopy.width, canvasCopy.height);

    let r;
    let g;
    let b;
    let a;
    let updated;

    for (let i = 0; i < imageData.data.length; i += 4) {

        r = imageData.data[i];
        g = imageData.data[i + 1];
        b = imageData.data[i + 2];
        a = imageData.data[i + 3];


        updated = cb({ r, g, b, a });

        imageData.data[i] = updated.r;
        imageData.data[i + 1] = updated.g;
        imageData.data[i + 2] = updated.b;
        imageData.data[i + 3] = updated.a;
    }

    ctxCopy.putImageData(imageData, 0, 0);

    ctx.drawImage(canvasCopy, 0, 0);
}


export { night };