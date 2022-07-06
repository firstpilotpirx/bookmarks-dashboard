"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const grid_size_1 = require("../grid-size/grid-size");
const grid_row_1 = require("../grid-row/grid-row");
class Grid {
    name;
    grid = new Array();
    size = new grid_size_1.GridSize(1, 1);
    constructor(size, name = 'grid') {
        this.name = name;
        if (size instanceof grid_size_1.GridSize) {
            this.size = size;
            for (let row = 0; row < this.size.rowCount; row++) {
                this.grid.push(new grid_row_1.GridRow(size.columnCount));
            }
        }
        else {
            this.setState(size);
        }
    }
    setBookmark(position, bookmark) {
        this.getRow(position.row).setBookmark(position.column, bookmark);
    }
    getBookmark(position) {
        return this.getRow(position.row).getBookmark(position.column);
    }
    // TODO add test
    getRow(rowIndex) {
        if (rowIndex >= this.size.rowCount) {
            throw new Error(`Row index out of range, row count: ${this.size.rowCount}, but row index: ${rowIndex}`);
        }
        // @ts-ignore
        return this.grid[rowIndex];
    }
    getAllRows() {
        return this.grid;
    }
    deleteBookmark(position) {
        this.getRow(position.row).deleteBookmark(position.column);
    }
    getSize() {
        return this.size;
    }
    setSize(size) {
        const grid = new Array();
        for (let rowIndex = 0; rowIndex < size.rowCount; rowIndex++) {
            if (rowIndex < this.size.rowCount) {
                // @ts-ignore
                const row = this.grid[rowIndex];
                // @ts-ignore
                row.setSize(size.columnCount);
                // @ts-ignore
                grid.push(row);
            }
            else {
                grid.push(new grid_row_1.GridRow(size.columnCount));
            }
        }
        this.grid = grid;
        this.size = size;
    }
    addRowAtTheEnd() {
        this.setSize(new grid_size_1.GridSize(this.size.rowCount + 1, this.size.columnCount));
    }
    deleteLastRow() {
        this.setSize(new grid_size_1.GridSize(this.size.rowCount - 1, this.size.columnCount));
    }
    addColumnAtTheEnd() {
        this.setSize(new grid_size_1.GridSize(this.size.rowCount, this.size.columnCount + 1));
    }
    deleteLastColumn() {
        this.setSize(new grid_size_1.GridSize(this.size.rowCount, this.size.columnCount - 1));
    }
    getState() {
        return {
            name: this.name,
            size: this.size.getState(),
            grid: this.grid.map((row) => row.getState()),
        };
    }
    setState(state) {
        this.name = state.name;
        this.size = new grid_size_1.GridSize(state.size);
        this.grid = state.grid.map((row) => new grid_row_1.GridRow(row));
    }
}
exports.Grid = Grid;
