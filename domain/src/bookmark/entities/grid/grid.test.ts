import { Grid } from './grid';
import { Bookmark } from '../bookmark/bookmark';
import { GridPosition } from '../grid-position/grid-position';
import { GridSize } from '../grid-size/grid-size';
import { GridRow } from '../grid-row/grid-row';
import { GridRowState } from '../grid-row/grid-row-state';

describe('Unit Test Grid', () => {
  test('should create with row and colum', async () => {
    const grid = new Grid(new GridSize(7, 5));

    expect(grid.size.rowCount).toEqual(7);
    expect(grid.size.columnCount).toEqual(5);
  });

  test('should create with min row and min colum', async () => {
    const grid = new Grid(new GridSize(1, 1));

    expect(grid.size.rowCount).toEqual(1);
    expect(grid.size.columnCount).toEqual(1);
  });

  test('should set and get bookmarks', async () => {
    const bookmark1 = new Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark2 = new Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark3 = new Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const grid = new Grid(new GridSize(5, 5));

    grid.setBookmark(new GridPosition(0, 0), bookmark1);
    grid.setBookmark(new GridPosition(2, 2), bookmark2);
    grid.setBookmark(new GridPosition(4, 4), bookmark3);

    expect(grid.getBookmark(new GridPosition(0, 0))).toEqual(bookmark1);
    expect(grid.getBookmark(new GridPosition(2, 2))).toEqual(bookmark2);
    expect(grid.getBookmark(new GridPosition(4, 4))).toEqual(bookmark3);
  });

  test('should not set bookmarks because position out of range', async () => {
    const bookmark = new Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const grid = new Grid(new GridSize(5, 5));

    expect(() => grid.setBookmark(new GridPosition(5, 5), bookmark)).toThrow();
  });

  test('should not get bookmarks because position out of range', async () => {
    const grid = new Grid(new GridSize(5, 5));

    expect(() => grid.getBookmark(new GridPosition(5, 5))).toThrow();
  });

  test('should get undefined instead bookmarks', async () => {
    const grid = new Grid(new GridSize(5, 5));

    expect(grid.getBookmark(new GridPosition(0, 0))).toEqual(undefined);
  });

  test('should delete bookmarks', async () => {
    const bookmark = new Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const grid = new Grid(new GridSize(5, 5));
    const position = new GridPosition(2, 2);

    grid.setBookmark(position, bookmark);
    expect(grid.getBookmark(new GridPosition(2, 2))).toEqual(bookmark);

    grid.deleteBookmark(position);
    expect(grid.getBookmark(new GridPosition(2, 2))).toEqual(undefined);
  });

  test('should get all rows', async () => {
    const bookmark1 = new Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark2 = new Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark3 = new Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const grid = new Grid(new GridSize(5, 5));

    grid.setBookmark(new GridPosition(0, 0), bookmark1);
    grid.setBookmark(new GridPosition(2, 2), bookmark2);
    grid.setBookmark(new GridPosition(4, 4), bookmark3);

    expect(grid.getAllRows()).toEqual([
      { bookmarks: [bookmark1, undefined, undefined, undefined, undefined] },
      { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
      { bookmarks: [undefined, undefined, bookmark2, undefined, undefined] },
      { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
      { bookmarks: [undefined, undefined, undefined, undefined, bookmark3] },
    ]);
  });

  test('should get state', async () => {
    const bookmark1 = new Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark2 = new Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark3 = new Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const size = new GridSize(5, 5);
    const grid = new Grid(size, 'name');

    grid.setBookmark(new GridPosition(0, 0), bookmark1);
    grid.setBookmark(new GridPosition(2, 2), bookmark2);
    grid.setBookmark(new GridPosition(4, 4), bookmark3);

    expect(grid.getState()).toEqual({
      name: 'name',
      size: size.getState(),
      grid: [
        { bookmarks: [bookmark1.getState(), undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, bookmark2.getState(), undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, bookmark3.getState()] },
      ],
    });
  });

  test('should create from state', async () => {
    const bookmark1 = new Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark2 = new Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark3 = new Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const size = new GridSize(5, 5);
    const gridState = {
      name: 'name',
      size: size.getState(),
      grid: [
        { bookmarks: [bookmark1.getState(), undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, bookmark2.getState(), undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, bookmark3.getState()] },
      ],
    };

    const grid = new Grid(gridState);

    expect(grid.name).toEqual('name');
    expect(grid.size).toEqual(size);
    expect(grid.getAllRows()).toEqual([
      new GridRow({ bookmarks: [bookmark1.getState(), undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, bookmark2.getState(), undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, bookmark3.getState()] } as GridRowState),
    ]);
  });

  test('should get row', async () => {
    const bookmark1 = new Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark2 = new Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark3 = new Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const grid = new Grid(new GridSize(5, 5));

    grid.setBookmark(new GridPosition(0, 0), bookmark1);
    grid.setBookmark(new GridPosition(2, 2), bookmark2);
    grid.setBookmark(new GridPosition(4, 4), bookmark3);
    const row = new GridRow(5);
    row.setBookmark(0, undefined);
    row.setBookmark(1, undefined);
    row.setBookmark(2, bookmark2);
    row.setBookmark(3, undefined);
    row.setBookmark(4, undefined);

    expect(grid.getRow(2)).toEqual(row);
  });

  test('should get size', async () => {
    const size = new GridSize(5, 5);

    const grid = new Grid(size);

    expect(grid.getSize()).toEqual(size);
  });

  test('should set size more', async () => {
    const size = new GridSize(5, 5);
    const sizeNew = new GridSize(6, 6);
    const grid = new Grid(size);

    grid.setSize(sizeNew);

    expect(grid.getSize()).toEqual(sizeNew);
    expect(grid.getAllRows()).toEqual([
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined, undefined] } as GridRowState),
    ]);
  });

  test('should set size less', async () => {
    const size = new GridSize(5, 5);
    const sizeNew = new GridSize(1, 1);
    const grid = new Grid(size);

    grid.setSize(sizeNew);

    expect(grid.getSize()).toEqual(sizeNew);
    expect(grid.getAllRows()).toEqual([new GridRow({ bookmarks: [undefined] } as GridRowState)]);
  });

  test('should not delete last row', async () => {
    const size = new GridSize(1, 1);
    const grid = new Grid(size);

    expect(() => grid.deleteLastRow()).toThrow();
  });

  test('should not delete last column', async () => {
    const size = new GridSize(1, 1);
    const grid = new Grid(size);

    expect(() => grid.deleteLastColumn()).toThrow();
  });

  test('should add row', async () => {
    const bookmark1 = new Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark2 = new Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark3 = new Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const size = new GridSize(5, 5);
    const gridState = {
      name: 'name',
      size: size.getState(),
      grid: [
        { bookmarks: [bookmark1.getState(), undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, bookmark2.getState(), undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, bookmark3.getState()] },
      ],
    };
    const grid = new Grid(gridState);

    grid.addRowAtTheEnd();

    expect(grid.getAllRows()).toEqual([
      new GridRow({ bookmarks: [bookmark1.getState(), undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, bookmark2.getState(), undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, bookmark3.getState()] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined] } as GridRowState),
    ]);
  });

  test('should delete row', async () => {
    const bookmark1 = new Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark2 = new Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark3 = new Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const size = new GridSize(5, 5);
    const gridState = {
      name: 'name',
      size: size.getState(),
      grid: [
        { bookmarks: [bookmark1.getState(), undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, bookmark2.getState(), undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, bookmark3.getState()] },
      ],
    };
    const grid = new Grid(gridState);

    grid.deleteLastRow();

    expect(grid.getAllRows()).toEqual([
      new GridRow({ bookmarks: [bookmark1.getState(), undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, bookmark2.getState(), undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined] } as GridRowState),
    ]);
  });

  test('should add column', async () => {
    const bookmark1 = new Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark2 = new Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark3 = new Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const size = new GridSize(5, 5);
    const gridState = {
      name: 'name',
      size: size.getState(),
      grid: [
        { bookmarks: [bookmark1.getState(), undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, bookmark2.getState(), undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, bookmark3.getState()] },
      ],
    };
    const grid = new Grid(gridState);

    grid.addColumnAtTheEnd();

    expect(grid.getAllRows()).toEqual([
      new GridRow({ bookmarks: [bookmark1.getState(), undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, bookmark2.getState(), undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined, bookmark3.getState(), undefined] } as GridRowState),
    ]);
  });

  test('should delete column', async () => {
    const bookmark1 = new Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark2 = new Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const bookmark3 = new Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
    const size = new GridSize(5, 5);
    const gridState = {
      name: 'name',
      size: size.getState(),
      grid: [
        { bookmarks: [bookmark1.getState(), undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, bookmark2.getState(), undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, undefined] },
        { bookmarks: [undefined, undefined, undefined, undefined, bookmark3.getState()] },
      ],
    };
    const grid = new Grid(gridState);

    grid.deleteLastColumn();

    expect(grid.getAllRows()).toEqual([
      new GridRow({ bookmarks: [bookmark1.getState(), undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, bookmark2.getState(), undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined] } as GridRowState),
      new GridRow({ bookmarks: [undefined, undefined, undefined, undefined] } as GridRowState),
    ]);
  });
});
