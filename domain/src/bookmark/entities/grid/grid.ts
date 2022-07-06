import { Bookmark } from '../bookmark/bookmark';
import { GridPosition } from '../grid-position/grid-position';
import { GridSize } from '../grid-size/grid-size';
import { GridState } from './grid.state';
import { GridRow } from '../grid-row/grid-row';

export class Grid {
  private grid = new Array<GridRow>();

  public size = new GridSize(1, 1);

  constructor(size: GridSize | GridState, public name: string = 'grid') {
    if (size instanceof GridSize) {
      this.size = size;

      for (let row = 0; row < this.size.rowCount; row++) {
        this.grid.push(new GridRow(size.columnCount));
      }
    } else {
      this.setState(size);
    }
  }

  setBookmark(position: GridPosition, bookmark: Bookmark): void {
    this.getRow(position.row).setBookmark(position.column, bookmark);
  }

  getBookmark(position: GridPosition): Bookmark | undefined {
    return this.getRow(position.row).getBookmark(position.column);
  }

  // TODO add test
  getRow(rowIndex: number): GridRow {
    if (rowIndex >= this.size.rowCount) {
      throw new Error(`Row index out of range, row count: ${this.size.rowCount}, but row index: ${rowIndex}`);
    }

    // @ts-ignore
    return this.grid[rowIndex];
  }

  getAllRows(): Array<GridRow> {
    return this.grid;
  }

  deleteBookmark(position: GridPosition): void {
    this.getRow(position.row).deleteBookmark(position.column);
  }

  getSize(): GridSize {
    return this.size;
  }

  setSize(size: GridSize): void {
    const grid = new Array<GridRow>();
    for (let rowIndex = 0; rowIndex < size.rowCount; rowIndex++) {
      if (rowIndex < this.size.rowCount) {
        // @ts-ignore
        const row = this.grid[rowIndex];
        // @ts-ignore
        row.setSize(size.columnCount);
        // @ts-ignore
        grid.push(row);
      } else {
        grid.push(new GridRow(size.columnCount));
      }
    }

    this.grid = grid;
    this.size = size;
  }

  addRowAtTheEnd(): void {
    this.setSize(new GridSize(this.size.rowCount + 1, this.size.columnCount));
  }

  deleteLastRow(): void {
    this.setSize(new GridSize(this.size.rowCount - 1, this.size.columnCount));
  }

  addColumnAtTheEnd(): void {
    this.setSize(new GridSize(this.size.rowCount, this.size.columnCount + 1));
  }

  deleteLastColumn(): void {
    this.setSize(new GridSize(this.size.rowCount, this.size.columnCount - 1));
  }

  getState(): GridState {
    return {
      name: this.name,
      size: this.size.getState(),
      grid: this.grid.map((row) => row.getState()),
    };
  }

  private setState(state: GridState): void {
    this.name = state.name;
    this.size = new GridSize(state.size);
    this.grid = state.grid.map((row) => new GridRow(row));
  }
}
