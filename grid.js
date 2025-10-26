import * as array from "./array.js";
/**
 * @typedef Cell 
 * @property {number} row
 * @property {number} col
 */


/**
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} rows 
 * @param {number} cols
 * @param {number} cellSize
 */
function drawGrid(ctx, rows, cols, cellSize, offsetX = 0, offsetY = 0, strokeColor = "black", fillColor = "white") {

    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;

    const translateOffset = 0.5;

    for(let r = 0; r < rows; ++r) {

        for (let c = 0; c < cols; ++c) {

            ctx.moveTo((c * cellSize + translateOffset) + offsetX, r * cellSize + translateOffset + offsetY);
            ctx.lineTo((c + 1) * cellSize + translateOffset + offsetX, r * cellSize + translateOffset + offsetY);
            ctx.lineTo((c + 1) * cellSize + translateOffset + offsetX,(r + 1) * cellSize+  translateOffset + offsetY);
            ctx.lineTo(c * cellSize + translateOffset + offsetX, (r + 1) * cellSize + translateOffset + offsetY);
            ctx.lineTo(c * cellSize + translateOffset + offsetX,  r * cellSize + translateOffset + offsetY);

        }
    }

    ctx.stroke();
}


/**
 * 
 * Creates a grid i.e. a 2D array with any (hehe) value you like.
 * 
 * @param {number} rows 
 * @param {number} cols 
 * @param {any} defaultCellValue 
 * @returns {any[][]}
 */
function createGrid(rows, cols, defaultCellValue = null) {
    const grid = [];
    for(let r = 0; r < rows; ++r) {
   
        const row = [];
        for(let c = 0; c < cols; ++c) {
           
            const value = defaultCellValue === "array" ? [] : defaultCellValue;
            row.push(value);
     
        }
   
        grid.push(row);
            
    }

    return grid;
}

/** 
* Gets a list of all neighbours to a cell in the grid.
*
* @param {Cell} cell 
* @param {(0 | 1)[][]} grid
*/
function getNeighbours(cell, grid, includeDiagonalNeighbours = false) {
  
    const rows = grid.length;
    const cols = grid[0].length;
    const neighbours = [];

    const neighbourDiffs = includeDiagonalNeighbours ? 
        [
        [-1, -1], [-1, 0], [-1, 1], 
        [0, -1],     [0, 1], 
        [1, -1], [1, 0], [1, 1]] 
        : 
        [[-1, 0], [0, 1], [1, 0], [0, -1]]

    for(const [r, c] of neighbourDiffs) {
        const n = {row: cell.row + r, col: cell.col + c};
        if(n.row !== -1 && n.col !== -1 && n.row !== rows && n.col !== cols) neighbours.push(n);     
    }

    return neighbours;
}

/**
 * Get random cell in the grid.
 * 
 * @param {any[][]} grid 
 * @returns {Cell} 
 */
function getRandomCell(grid) {
    return {row: grid.randomIdx(), col: grid[0].randomIdx() }
}



export { createGrid, drawGrid, getNeighbours, getRandomCell };