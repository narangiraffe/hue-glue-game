import CellIndex from "./cell-index.js"

export default class Grid {
    constructor(rows, cols) {
        this.rows = rows
        this.cols = cols
        this.cells = Grid.#makeGrid(rows, cols)
        this.anchors = Grid.makeAnchorIndexes(rows, cols)
    }

    getCell(cellIndex) {
        return this.cells[cellIndex.row][cellIndex.col];
    }

    static #makeGrid(rows, cols) {
        return Array.from({ length: rows }, () => Array(cols).fill(null))
    }                                                                                                                                                                                                       

    static makeAnchorIndexes(rows, cols) {
        return [
            new CellIndex(0, 0),
            new CellIndex(0, cols - 1),
            new CellIndex(rows - 1, 0),
            new CellIndex(rows - 1, cols - 1),
        ]
    }
}