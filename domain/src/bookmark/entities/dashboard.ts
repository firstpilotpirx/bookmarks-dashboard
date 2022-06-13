import { Grid } from './grid';
import { GridSize } from './grid-size';

export class Dashboard {
  private grids: Grid[] = [];

  constructor(private defaultGridSize = new GridSize(5, 5)) {}

  createGrid(gridRowCount = this.defaultGridSize.rowCount, gridColumnCount = this.defaultGridSize.columnCount): void {
    this.grids.push(new Grid(new GridSize(gridRowCount, gridColumnCount), this.grids.length.toString()));
  }

  getAllGrids(): Grid[] {
    return this.grids;
  }
  getGrid(gridIndex: number): Grid | undefined {
    if (gridIndex >= this.grids.length) {
      throw new Error('Out of range');
    }

    return this.grids[gridIndex];
  }

  deleteGrid(gridIndex: number): void {
    if (gridIndex >= this.grids.length) {
      throw new Error('Out of range');
    }

    this.grids = this.grids.filter((_value, index) => index !== gridIndex);
  }
}
