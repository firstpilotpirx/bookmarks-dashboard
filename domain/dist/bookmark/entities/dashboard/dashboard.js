"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const grid_1 = require("../grid/grid");
const grid_size_1 = require("../grid-size/grid-size");
class Dashboard {
    grids = [];
    defaultGridSize = new grid_size_1.GridSize(5, 5);
    constructor(defaultGridSize) {
        if (defaultGridSize === undefined) {
            return;
        }
        if (defaultGridSize instanceof grid_size_1.GridSize) {
            this.defaultGridSize = defaultGridSize;
            return;
        }
        this.setState(defaultGridSize);
    }
    createGrid(gridRowCount = this.defaultGridSize.rowCount, gridColumnCount = this.defaultGridSize.columnCount) {
        this.grids.push(new grid_1.Grid(new grid_size_1.GridSize(gridRowCount, gridColumnCount), this.grids.length.toString()));
    }
    getAllGrids() {
        return this.grids;
    }
    getGrid(gridIndex) {
        if (gridIndex >= this.grids.length) {
            throw new Error('Out of range');
        }
        // @ts-ignore
        return this.grids[gridIndex];
    }
    deleteGrid(gridIndex) {
        if (gridIndex >= this.grids.length) {
            throw new Error('Out of range');
        }
        this.grids = this.grids.filter((_value, index) => index !== gridIndex);
    }
    getState() {
        return {
            defaultGridSize: this.defaultGridSize.getState(),
            grids: this.grids.map((grid) => grid.getState()),
        };
    }
    setState(state) {
        this.defaultGridSize = new grid_size_1.GridSize(state.defaultGridSize);
        this.grids = state.grids.map((gridState) => new grid_1.Grid(gridState));
    }
}
exports.Dashboard = Dashboard;
