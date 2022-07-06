"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridPosition = void 0;
class GridPosition {
    row;
    column;
    constructor(row, column) {
        if (column === undefined) {
            const state = row;
            this.row = state.row;
            this.column = state.column;
        }
        else {
            this.row = row;
            this.column = column;
        }
        if (this.row < 0 || this.column < 0) {
            throw new Error(`can not create with negative row or column, but row=${this.row}, column=${this.column}`);
        }
    }
    getState() {
        return {
            row: this.row,
            column: this.column,
        };
    }
}
exports.GridPosition = GridPosition;
