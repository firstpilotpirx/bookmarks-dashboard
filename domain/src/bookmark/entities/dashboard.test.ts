import { Dashboard } from './dashboard';
import { GridSize } from './grid-size';

describe('Unit Test Dashboard', () => {
  test('should create empty dashboard', async () => {
    const dashboard = new Dashboard();

    expect(dashboard.getAllGrids().length).toEqual(0);
  });

  test('should create grid with default grid size', async () => {
    const dashboard = new Dashboard();
    dashboard.createGrid();

    expect(dashboard.getGrid(0)?.size.rowCount).toEqual(5);
    expect(dashboard.getGrid(0)?.size.columnCount).toEqual(5);
  });

  test('should create grid with custom grid size set with constructor', async () => {
    const dashboard = new Dashboard(new GridSize(1, 2));
    dashboard.createGrid();

    expect(dashboard.getGrid(0)?.size.rowCount).toEqual(1);
    expect(dashboard.getGrid(0)?.size.columnCount).toEqual(2);
  });

  test('should create grid with custom grid size set with createGrid', async () => {
    const dashboard = new Dashboard();
    dashboard.createGrid(1, 2);

    expect(dashboard.getGrid(0)?.size.rowCount).toEqual(1);
    expect(dashboard.getGrid(0)?.size.columnCount).toEqual(2);
  });

  test('should create grid', async () => {
    const dashboard = new Dashboard();
    dashboard.createGrid();
    dashboard.createGrid();
    dashboard.createGrid();

    const allGrids = dashboard.getAllGrids();
    expect(allGrids.length).toEqual(3);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(allGrids[0].name).toEqual('0');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(allGrids[1].name).toEqual('1');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(allGrids[2].name).toEqual('2');
  });

  test('should get grid', async () => {
    const dashboard = new Dashboard();
    dashboard.createGrid();
    dashboard.createGrid();
    dashboard.createGrid();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(dashboard.getGrid(0).name).toEqual('0');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(dashboard.getGrid(1).name).toEqual('1');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(dashboard.getGrid(2).name).toEqual('2');
  });

  test('should not get grid because out of range', async () => {
    const dashboard = new Dashboard();

    expect(() => dashboard.getGrid(0)).toThrow();
  });

  test('should delete grid', async () => {
    const dashboard = new Dashboard();
    dashboard.createGrid();
    dashboard.createGrid();
    dashboard.createGrid();
    dashboard.deleteGrid(1);

    const allGrids = dashboard.getAllGrids();
    expect(allGrids.length).toEqual(2);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(allGrids[0].name).toEqual('0');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(allGrids[1].name).toEqual('2');
  });

  test('should not delete grid because out of range', async () => {
    const dashboard = new Dashboard();

    expect(() => dashboard.deleteGrid(0)).toThrow();
  });

  // xtest('test', async () => {
  //   const dashboard = new Dashboard();
  //
  //   dashboard.getAllGrids();
  //   dashboard.getGrid(1)?.name;
  //   dashboard.getGrid(1)?.size.rowCount;
  //   dashboard.getGrid(1)?.size.columnCount;
  //   dashboard.getGrid(1)?.getBookmark(new GridPosition(1, 1));
  //   dashboard.getGrid(1)?.setBookmark(new GridPosition(1, 1), new Bookmark());
  //   dashboard.getAllGrids().forEach(grid => grid.getAllRows.forEach(row => row.forEach(item => item.url)));
  // });
});