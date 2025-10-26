
import * as array from "./array.js";
/**
 * @typedef Cell 
 * @property {number} row
 * @property {number} col
 */


/**
 * @param {Cell} cell 
 * @param {any[][]} grid 
 * @returns {boolean}
 */
function cellIsWithinBounds(cell, grid) {
    return cell.row >= 0 && cell.row < grid.length && cell.col >= 0 && cell.col < grid[0].length;
}



/**
 * Creates the closest path in the grid using A* algorithm.
 *  
 * @param {Cell} from 
 * @param {Cell} to
 * @param {any[][]} grid
 * @param {number[]} [walkableTileValues] a list of what values non walkable cells have
 * @returns {Cell[]} path, array of grid cells 
 * 
 */
function createPathAStar(from, to, grid) {

    if(!cellIsWithinBounds(from, grid)) throw new Error("'from' cell is out of bounds");
    if(!cellIsWithinBounds(to, grid)) throw new Error("'to' cell is out of bounds"); 

    const rows = grid.length;
    const cols = grid[0].length;

    const manhattan = (from, to) => Math.abs(to.row - from.row) + Math.abs(to.col - from.col);
    const euclidean = (from, to) => Math.sqrt(Math.pow(from.row - to.row, 2) + Math.pow(from.col - to.col, 2));

    const heuristic = manhattan;

    const reconstructPath = (pathMap) => {

        let curr = to;
        let path = [to];
    
        while (curr !== null) {
            curr = pathMap[curr.row][curr.col];
            if(curr) {
                path.push(curr);
            }
          
        }

        return path.reverse();
    }

    const openList = [from];
    const closeList = [];

    // Keeps track of where we came from for each cell
    const pathMap = createGrid(rows, cols);

    // Keeps track of lowest scores for the cells (f = g + h)
    const scoresMap = createGrid(rows, cols, 100000); 

    scoresMap[from.row][from.col] = 0;

    let curr;

    while(openList.length > 0) {
     
        // Find cell with lowest score in the openList bc this is the most optimal path to take right now

        curr = openList.reduce((optimalCell, curr) => {
            if(optimalCell === undefined 
                || scoresMap[curr.row][curr.col] < scoresMap[optimalCell.row][optimalCell.col]) {
                return curr;
            }

            return optimalCell;

        }, undefined);

        if(curr.row === to.row && curr.col === to.col) break;

        const neighbours = getNeighbours(curr, grid);

        const g = scoresMap[curr.row][curr.col] + 1; 

        for(const n of neighbours) {

            if(grid[n.row][n.col] === 1) continue;

            const h = heuristic(n, to);
            const f = g + h;

            const cellInClosedList = closeList.find(c => c.row === n.row && c.col === n.col);
            const cellInOpenedList = openList.find(c => c.row === n.row && c.col === n.col);

            if (cellInOpenedList && scoresMap[cellInOpenedList.row][cellInOpenedList.col] < f) {
                continue;
            } else if (cellInClosedList && scoresMap[cellInClosedList.row][cellInClosedList.col] < f)  {
                continue;
            } else {
                if(cellInOpenedList === undefined) openList.push(n); 
                scoresMap[n.row][n.col] = g;
                pathMap[n.row][n.col] = curr;
            }
        }

        openList.remove(curr);
        closeList.push(curr);
    }

    if(pathMap[to.row][to.col] === null) {
        throw new Error("No path found!");
    }

    return reconstructPath(pathMap);
}


/**
 * 
 * Creates a path in the grid using the Breadth first search algorithm (BFS).
 *  
 * @param {Cell} from 
 * @param {Cell} to
 * @param {(0 | 1)[][]} grid 
 * @returns {Cell[]} 
 * 
 */
function createPathBFS(from, to, grid) {

    const rows = grid.length;
    const cols = grid.length[0];
    
    const reconstructPath = (pathMap) => {

        let curr = to;

        let path = [to];
        
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

    queue.push(from);
    path[from.row][from.col] = null;
    visited[from.row][from.col] = true;

    while (queue.length > 0) {

      curr = queue.shift();

      for (const n of getNeighbours(curr, grid)) {

        if (n.row === to.row && n.col === to.col) {
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

export { createPathAStar, createPathBFS }
