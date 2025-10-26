import * as array from "./array.js";
import { createGrid, getRandomCell, getNeighbours} from "./grid.js"

/**
 * @typedef Cell 
 * @property {number} row
 * @property {number} col
 */


/**
 * Creates a maze using a Prims algorithm.
 * 
 * This algorithm will do a loop-erase random walk.
 * 
 * @param {number} rows
 * @param {number} cols
 * @param {{start: {row: number, col: number}, rows: number, cols: number}} [room]
 * 
 * @returns {(0 | 1)[][]}
 */
function createMazePrim(rows, cols, room) {

    const maze = createGrid(rows, cols, 'array');

    if(room !== undefined) {
      for(let r = room.start.row; r < room.start.row + room.rows; ++r) {
        for(let c = room.start.col; c < room.start.col + room.cols; ++c) {
            maze[r][c] = null;
        }
      }
    }


    /**
     * @type {Cell[]}
     */
    const set = [];

    // Pick first random cell that is not in the room

    while(true) {
      let c = getRandomCell(maze);
      if(c !== null) {
        
        set.push(c);
        break;
      }
    }


    let curr;
    let randSetIdx;
    let neighbours;
    let randN;

    while (set.length > 0) {
    
      randSetIdx = set.randomIdx();
      curr = set[randSetIdx];

      // Unvisited neighbours when no other cell has been added to its list of connected neighbours.
      neighbours = getNeighbours(curr, maze, false).filter(n => maze[n.row][n.col] !== null && maze[n.row][n.col].length === 0);

      if (neighbours.length > 0) {

        randN = neighbours.random();

        maze[curr.row][curr.col].push(randN);
        maze[randN.row][randN.col].push(curr);

        set.push(randN);
    
      } else {
        set.splice(randSetIdx, 1);
      }
    }

    if(room !== undefined) {
      // Add neightbours to the room cells

      const roomGrid = createGrid(room.rows, room.cols);


      for(let r = 0; r < room.rows; ++r) {
        for(let c = 0; c < room.cols; ++c) {

            const mazeRow = r + room.start.row;
            const mazeCol = c + room.start.col;

            maze[mazeRow][mazeCol] = [];

            const neighbours = getNeighbours({row: r, col: c}, roomGrid, true).map(n => ({row: n.row + room.start.row, col: n.col + room.start.col}))

              if (neighbours.length > 0) {

                for(const n of neighbours) {
                  if(maze[n.row][n.col] === null) maze[n.row][n.col] = [];
                  maze[mazeRow][mazeCol].push(n);
                  maze[n.row][n.col].push({row: mazeRow, col: mazeCol});
                }
              }
        }
      }
     }

    return createTileMap(maze);
  }


/**
 * 
 * @param {Cell[][][]} maze 
 * @returns {(0 | 1)[][]} tilemap/grid represenation of the maze
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

        if(currentMazeCell !== null) {
          
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
        } else {
          console.log("NULL", r, c);
        }
       
      }
    }

    return tileMap;
}


export {  createMazePrim };