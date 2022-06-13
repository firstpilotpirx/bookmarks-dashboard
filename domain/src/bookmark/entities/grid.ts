import { Bookmark } from './bookmark';
import { GridPosition } from './grid-position';
import { GridSize } from './grid-size';
import { GridState } from './grid.state';

export class Grid {
  private grid = new Array<Array<Bookmark | undefined>>();

  public size = new GridSize(1, 1);

  constructor(size: GridSize | GridState, public name: string = 'grid') {
    if (size instanceof GridSize) {
      this.size = size;

      for (let row = 0; row < this.size.rowCount; row++) {
        const row: Array<Bookmark | undefined> = [];
        for (let column = 0; column < this.size.columnCount; column++) {
          row.push(undefined);
        }
        this.grid.push(row);
      }
    } else {
      this.setState(size);
    }
  }

  setBookmark(position: GridPosition, bookmark: Bookmark): void {
    if (position.row >= this.size.rowCount || position.column >= this.size.columnCount) {
      throw new Error(
        `Can not set bookmark because out of range, grid size rowCount=${this.size.rowCount}, columnCount=${this.size.columnCount}, but position has row=${position.row}, column=${position.column}`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.grid[position.row][position.column] = bookmark;
  }

  getBookmark(position: GridPosition): Bookmark | undefined {
    if (position.row >= this.size.rowCount || position.column >= this.size.columnCount) {
      throw new Error(
        `Can not get bookmark because out of range, grid size rowCount=${this.size.rowCount}, columnCount=${this.size.columnCount}, but position has row=${position.row}, column=${position.column}`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.grid[position.row][position.column];
  }

  getAllRows(): Array<Array<Bookmark | undefined>> {
    return this.grid;
  }

  deleteBookmark(position: GridPosition): void {
    if (position.row >= this.size.rowCount || position.column >= this.size.columnCount) {
      throw new Error(
        `Can not delete bookmark because out of range, grid size rowCount=${this.size.rowCount}, columnCount=${this.size.columnCount}, but position has row=${position.row}, column=${position.column}`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.grid[position.row][position.column] = undefined;
  }

  getState(): GridState {
    return {
      name: this.name,
      size: this.size.getState(),
      grid: this.grid.map((row) => row.map((item) => item?.getState())),
    };
  }

  private setState(state: GridState): void {
    this.name = state.name;
    this.size = new GridSize(state.size);
    this.grid = state.grid.map((row) => row.map((itemState) => (itemState === undefined ? undefined : new Bookmark(itemState))));
  }
}
