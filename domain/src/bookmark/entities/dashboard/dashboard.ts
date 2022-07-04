import { Grid } from '../grid/grid';
import { GridSize } from '../grid-size/grid-size';
import { DashboardState } from './dashboard.state';

export class Dashboard {
  private grids: Grid[] = [];

  private defaultGridSize = new GridSize(5, 5);

  constructor(defaultGridSize?: GridSize | DashboardState) {
    if (defaultGridSize === undefined) {
      return;
    }

    if (defaultGridSize instanceof GridSize) {
      this.defaultGridSize = defaultGridSize;
      return;
    }

    this.setState(defaultGridSize);
  }

  createGrid(gridRowCount = this.defaultGridSize.rowCount, gridColumnCount = this.defaultGridSize.columnCount): void {
    this.grids.push(new Grid(new GridSize(gridRowCount, gridColumnCount), this.grids.length.toString()));
  }

  getAllGrids(): Grid[] {
    return this.grids;
  }

  getGrid(gridIndex: number): Grid {
    if (gridIndex >= this.grids.length) {
      throw new Error('Out of range');
    }

    // @ts-ignore
    return this.grids[gridIndex];
  }

  deleteGrid(gridIndex: number): void {
    if (gridIndex >= this.grids.length) {
      throw new Error('Out of range');
    }

    this.grids = this.grids.filter((_value, index) => index !== gridIndex);
  }

  getState(): DashboardState {
    return {
      defaultGridSize: this.defaultGridSize.getState(),
      grids: this.grids.map((grid) => grid.getState()),
    };
  }

  private setState(state: DashboardState): void {
    this.defaultGridSize = new GridSize(state.defaultGridSize);
    this.grids = state.grids.map((gridState) => new Grid(gridState));
  }
}
