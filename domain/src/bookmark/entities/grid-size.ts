import { GridSizeState } from './grid-size.state';

export class GridSize {
  private state: GridSizeState;

  constructor(rowCount: number | GridSizeState, columnCount?: number) {
    if (columnCount === undefined) {
      this.state = rowCount as GridSizeState;
      return;
    }

    this.state = {
      rowCount: rowCount as number,
      columnCount: columnCount,
    };

    if (this.state.rowCount <= 0 || this.state.columnCount <= 0) {
      throw new Error(`Row and column should be positive and more than 0 bur row=${this.state.rowCount}, column=${this.state.columnCount}`);
    }
  }

  get rowCount(): number {
    return this.state.rowCount;
  }

  get columnCount(): number {
    return this.state.columnCount;
  }

  getState(): GridSizeState {
    return this.state;
  }
}
