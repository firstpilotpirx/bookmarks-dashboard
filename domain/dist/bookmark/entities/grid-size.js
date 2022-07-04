"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridSize = void 0;
class GridSize {
    state;
    constructor(rowCount, columnCount) {
        if (columnCount === undefined) {
            this.state = rowCount;
            return;
        }
        this.state = {
            rowCount: rowCount,
            columnCount: columnCount,
        };
        if (this.state.rowCount <= 0 || this.state.columnCount <= 0) {
            throw new Error(`Row and column should be positive and more than 0 bur row=${this.state.rowCount}, column=${this.state.columnCount}`);
        }
    }
    get rowCount() {
        return this.state.rowCount;
    }
    get columnCount() {
        return this.state.columnCount;
    }
    getState() {
        return this.state;
    }
}
exports.GridSize = GridSize;
