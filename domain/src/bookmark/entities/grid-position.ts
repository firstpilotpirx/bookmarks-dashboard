export class GridPosition {
  constructor(public row: number, public column: number) {
    if (row < 0 || column < 0) {
      throw new Error(`can not create with negative row or column, but row=${row}, column=${column}`);
    }
  }
}
