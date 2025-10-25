import * as array from "./array.js";

/**
 * @typedef Cell 
 * @property {number} row
 * @property {number} col
 */


/**
 * Creates a maze using a Prims algorithm.
 * The maze represented by a 2d grid of 1s and 0s where a 1 is a wall and 0 is a road.
 * 
 * This algorithm will do a loop-erase random walk.
 * 
 * @returns {(0 | 1)[][]}
 */
function createMazePrim(rows, cols) {

    const maze = createGrid(rows, cols, 'array');

    /**
     * @type {Cell[]}
     */
    const set = [];

    set.push(getRandomCell(maze));

    let curr;
    let randSetIdx;
    let neighbours;
    let randN;

    while (set.length > 0) {
    
      randSetIdx = set.randomIdx();
      curr = set[randSetIdx];

      neighbours = getNeighbours(curr, maze, false).filter(n => maze[n.row][n.col].length === 0);

      if (neighbours.length > 0) {

        randN = neighbours.random();

        maze[curr.row][curr.col].push(randN);
        maze[randN.row][randN.col].push(curr);

        set.push(randN);
    
      } else {
        set.splice(randSetIdx, 1);
      }
    }

    return maze;
  }

function getRandomCell(grid) {
    return {row: grid.randomIdx(), col: grid[0].randomIdx() }
}

/** 
* @param {Cell} cell 
* @param {(0 | 1)[][]} grid
*/
const getNeighbours = (cell, grid, includeDiagonalNeighbours = false) => {
  
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
 * 
 * Creates a path in the maze from start cell to end cell using Breadth first search algorithm (BFS)
 *  
 * @param {Cell} start 
 * @param {Cell} end
 * @param {(0 | 1)[][]} grid 
 * @returns {Cell[]} 
 * 
 */
function createPathBFS(start, end, grid) {

    const rows = grid.length;
    const cols = grid.length[0];
    
    const reconstructPath = (pathMap) => {

        let curr = end;

        let path = [end];
        
        while (!(curr.row === start.row && curr.col === start.col)) {
          
            curr = pathMap[curr.row][curr.col];
            path.push(curr);
        }

        return path.reverse();
    }

    const visited = createGrid(rows, cols, false);
    const path = createGrid(rows, cols);
    const queue = []; 

    let curr;

    queue.push(start);
    path[start.row][start.col] = null;
    visited[start.row][start.col] = true;

    while (queue.length > 0) {

      curr = queue.shift();

      for (const n of getNeighbours(curr, grid)) {

        if (n.row === end.row && n.col === end.col) {
            path[n.row][n.col] = curr;
            break;

        } else if (!visited[n.row][n.col]) {
            queue.push(n);
            path[n.row][n.col] = curr;
            visited[n.row][n.col] = curr;
        }
      }
    }

    return reconstructPath(path);
}


/**
 * Creates a grid which is a 2D array with any value you like.
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
 * 
 * @param {Cell[][][]} maze 
 * @returns {(0 | 1)[][]} tilemap
 */
function createTileMap(maze) {

    const rows = maze.length;
    const cols = maze[0].length;

    // Used in loop to get the row or col index of a tile. 
    const getNumInBetween = (num1, num2) => {
      return num1 < num2 ? num1 + 1 : num2 + 1;
    };

    // Initialize tilemap with walls for each cell
    /**
     * @type {(0 | 1)[][]} 
     */
    const tileMap = [];

    for (let r = 0; r < rows * 2 + 1; ++r) {

      const row = [];

      for (let c = 0; c < cols * 2 + 1; ++c) {
        row.push(1);
      }

      tileMap.push(row);
    }

    // Add road tiles for all the cells in the maze and to the neighbours. 
    for (let r = 0; r < rows; ++r) {
      for (let c = 0; c < cols; ++c) {

        const currentMazeCell = maze[r][c];

        // Create a ROAD tile for the current cell.
        tileMap[r * 2 + 1][c * 2 + 1] = 0;

        // Iterate through neighbours to create ROAD tiles to them. 
        for (const neighbour of currentMazeCell) {

          const rowDiff = neighbour.row * 2 + 1 - (r * 2 + 1);
          const colDiff = neighbour.col * 2 + 1 - (c * 2 + 1);

          const roadRow =
            rowDiff > 0
              ? getNumInBetween(neighbour.row * 2 + 1, r * 2 + 1)
              : r * 2 + 1;
          const roadCol =
            colDiff > 0
              ? getNumInBetween(neighbour.col * 2 + 1, c * 2 + 1)
              : c * 2 + 1;

          tileMap[roadRow][roadCol] = 0;
        }
      }
    }

    return tileMap;
  }


export { createPathBFS, createMazePrim,createTileMap };