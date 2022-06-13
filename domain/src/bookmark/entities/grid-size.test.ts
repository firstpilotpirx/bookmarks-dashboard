import { GridSize } from './grid-size';
import { GridSizeState } from './grid-size.state';

describe('Unit Test GridSize', () => {
  test('should create min size', async () => {
    const size = new GridSize(1, 1);

    expect(size.rowCount).toEqual(1);
    expect(size.columnCount).toEqual(1);
  });

  test('should create size', async () => {
    const size = new GridSize(2, 3);

    expect(size.rowCount).toEqual(2);
    expect(size.columnCount).toEqual(3);
  });

  test('should not create because row less min value', async () => {
    expect(() => new GridSize(0, 3)).toThrow();
  });

  test('should not create because column less min value', async () => {
    expect(() => new GridSize(2, 0)).toThrow();
  });

  test('should not create because row and column less min value', async () => {
    expect(() => new GridSize(0, 0)).toThrow();
  });

  test('should create from state', async () => {
    const state: GridSizeState = {
      rowCount: 2,
      columnCount: 3,
    };
    const size = new GridSize(state);

    expect(size.rowCount).toEqual(2);
    expect(size.columnCount).toEqual(3);
  });

  test('should get state', async () => {
    const size = new GridSize(2, 3);

    expect(size.getState()).toEqual({
      rowCount: 2,
      columnCount: 3,
    });
  });
});
