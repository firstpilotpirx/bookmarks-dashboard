"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const bookmark_1 = require("./bookmark");
const grid_size_1 = require("./grid-size");
class Grid {
    name;
    grid = new Array();
    size = new grid_size_1.GridSize(1, 1);
    constructor(size, name = 'grid') {
        this.name = name;
        if (size instanceof grid_size_1.GridSize) {
            this.size = size;
            for (let row = 0; row < this.size.rowCount; row++) {
                const row = [];
                for (let column = 0; column < this.size.columnCount; column++) {
                    row.push(undefined);
                }
                this.grid.push(row);
            }
        }
        else {
            this.setState(size);
        }
    }
    setBookmark(position, bookmark) {
        if (position.row >= this.size.rowCount || position.column >= this.size.columnCount) {
            throw new Error(`Can not set bookmark because out of range, grid size rowCount=${this.size.rowCount}, columnCount=${this.size.columnCount}, but position has row=${position.row}, column=${position.column}`);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.grid[position.row][position.column] = bookmark;
    }
    getBookmark(position) {
        if (position.row >= this.size.rowCount || position.column >= this.size.columnCount) {
            throw new Error(`Can not get bookmark because out of range, grid size rowCount=${this.size.rowCount}, columnCount=${this.size.columnCount}, but position has row=${position.row}, column=${position.column}`);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.grid[position.row][position.column];
    }
    getAllRows() {
        return this.grid;
    }
    deleteBookmark(position) {
        if (position.row >= this.size.rowCount || position.column >= this.size.columnCount) {
            throw new Error(`Can not delete bookmark because out of range, grid size rowCount=${this.size.rowCount}, columnCount=${this.size.columnCount}, but position has row=${position.row}, column=${position.column}`);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.grid[position.row][position.column] = undefined;
    }
    getState() {
        return {
            name: this.name,
            size: this.size.getState(),
            grid: this.grid.map((row) => row.map((item) => item?.getState())),
        };
    }
    setState(state) {
        this.name = state.name;
        this.size = new grid_size_1.GridSize(state.size);
        this.grid = state.grid.map((row) => row.map((itemState) => (itemState === undefined || itemState === null ? undefined : new bookmark_1.Bookmark(itemState))));
    }
}
exports.Grid = Grid;
