"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("./dashboard");
const grid_size_1 = require("../grid-size/grid-size");
describe('Unit Test Dashboard', () => {
    test('should create empty dashboard', async () => {
        const dashboard = new dashboard_1.Dashboard();
        expect(dashboard.getAllGrids().length).toEqual(0);
    });
    test('should create grid with default grid size', async () => {
        const dashboard = new dashboard_1.Dashboard();
        dashboard.createGrid();
        expect(dashboard.getGrid(0)?.size.rowCount).toEqual(5);
        expect(dashboard.getGrid(0)?.size.columnCount).toEqual(5);
    });
    test('should create grid with custom grid size set with constructor', async () => {
        const dashboard = new dashboard_1.Dashboard(new grid_size_1.GridSize(1, 2));
        dashboard.createGrid();
        expect(dashboard.getGrid(0)?.size.rowCount).toEqual(1);
        expect(dashboard.getGrid(0)?.size.columnCount).toEqual(2);
    });
    test('should create grid with custom grid size set with createGrid', async () => {
        const dashboard = new dashboard_1.Dashboard();
        dashboard.createGrid(1, 2);
        expect(dashboard.getGrid(0)?.size.rowCount).toEqual(1);
        expect(dashboard.getGrid(0)?.size.columnCount).toEqual(2);
    });
    test('should create grid', async () => {
        const dashboard = new dashboard_1.Dashboard();
        dashboard.createGrid();
        dashboard.createGrid();
        dashboard.createGrid();
        const allGrids = dashboard.getAllGrids();
        expect(allGrids.length).toEqual(3);
        // @ts-ignore
        expect(allGrids[0].name).toEqual('0');
        // @ts-ignore
        expect(allGrids[1].name).toEqual('1');
        // @ts-ignore
        expect(allGrids[2].name).toEqual('2');
    });
    test('should get grid', async () => {
        const dashboard = new dashboard_1.Dashboard();
        dashboard.createGrid();
        dashboard.createGrid();
        dashboard.createGrid();
        // @ts-ignore
        expect(dashboard.getGrid(0).name).toEqual('0');
        // @ts-ignore
        expect(dashboard.getGrid(1).name).toEqual('1');
        // @ts-ignore
        expect(dashboard.getGrid(2).name).toEqual('2');
    });
    test('should not get grid because out of range', async () => {
        const dashboard = new dashboard_1.Dashboard();
        expect(() => dashboard.getGrid(0)).toThrow();
    });
    test('should delete grid', async () => {
        const dashboard = new dashboard_1.Dashboard();
        dashboard.createGrid();
        dashboard.createGrid();
        dashboard.createGrid();
        dashboard.deleteGrid(1);
        const allGrids = dashboard.getAllGrids();
        expect(allGrids.length).toEqual(2);
        // @ts-ignore
        expect(allGrids[0].name).toEqual('0');
        // @ts-ignore
        expect(allGrids[1].name).toEqual('2');
    });
    test('should not delete grid because out of range', async () => {
        const dashboard = new dashboard_1.Dashboard();
        expect(() => dashboard.deleteGrid(0)).toThrow();
    });
    test('should get state', async () => {
        const dashboard = new dashboard_1.Dashboard(new grid_size_1.GridSize(1, 2));
        dashboard.createGrid();
        dashboard.createGrid();
        dashboard.createGrid();
        expect(dashboard.getState()).toEqual({
            defaultGridSize: {
                columnCount: 2,
                rowCount: 1,
            },
            grids: [
                {
                    grid: [
                        {
                            bookmarks: [undefined, undefined],
                        },
                    ],
                    name: '0',
                    size: {
                        columnCount: 2,
                        rowCount: 1,
                    },
                },
                {
                    grid: [
                        {
                            bookmarks: [undefined, undefined],
                        },
                    ],
                    name: '1',
                    size: {
                        columnCount: 2,
                        rowCount: 1,
                    },
                },
                {
                    grid: [
                        {
                            bookmarks: [undefined, undefined],
                        },
                    ],
                    name: '2',
                    size: {
                        columnCount: 2,
                        rowCount: 1,
                    },
                },
            ],
        });
    });
    test('should load from state', async () => {
        const state = {
            defaultGridSize: {
                columnCount: 2,
                rowCount: 1,
            },
            grids: [
                {
                    grid: [
                        {
                            bookmarks: [undefined, undefined],
                        },
                    ],
                    name: '0',
                    size: {
                        columnCount: 2,
                        rowCount: 1,
                    },
                },
                {
                    grid: [
                        {
                            bookmarks: [undefined, undefined],
                        },
                    ],
                    name: '1',
                    size: {
                        columnCount: 2,
                        rowCount: 1,
                    },
                },
                {
                    grid: [
                        {
                            bookmarks: [undefined, undefined],
                        },
                    ],
                    name: '2',
                    size: {
                        columnCount: 2,
                        rowCount: 1,
                    },
                },
            ],
        };
        const dashboard = new dashboard_1.Dashboard(state);
        const allGrids = dashboard.getAllGrids();
        expect(allGrids.length).toEqual(3);
        // @ts-ignore
        expect(allGrids[0].name).toEqual('0');
        // @ts-ignore
        expect(allGrids[1].name).toEqual('1');
        // @ts-ignore
        expect(allGrids[2].name).toEqual('2');
    });
});
