import { GridPositionState } from './grid-position.state';

export class GridPosition {
  row!: number;
  column!: number;

  constructor(row: number | GridPositionState, column?: number) {
    if (column === undefined) {
      const state = row as GridPositionState;
      this.row = state.row;
      this.column = state.column;
    } else {
      this.row = row as number;
      this.column = column;
    }

    if (this.row < 0 || this.column < 0) {
      throw new Error(`can not create with negative row or column, but row=${this.row}, column=${this.column}`);
    }
  }

  getState(): GridPositionState {
    return {
      row: this.row,
      column: this.column,
    };
  }
}
