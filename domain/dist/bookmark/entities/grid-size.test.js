"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_size_1 = require("./grid-size");
describe('Unit Test GridSize', () => {
    test('should create min size', async () => {
        const size = new grid_size_1.GridSize(1, 1);
        expect(size.rowCount).toEqual(1);
        expect(size.columnCount).toEqual(1);
    });
    test('should create size', async () => {
        const size = new grid_size_1.GridSize(2, 3);
        expect(size.rowCount).toEqual(2);
        expect(size.columnCount).toEqual(3);
    });
    test('should not create because row less min value', async () => {
        expect(() => new grid_size_1.GridSize(0, 3)).toThrow();
    });
    test('should not create because column less min value', async () => {
        expect(() => new grid_size_1.GridSize(2, 0)).toThrow();
    });
    test('should not create because row and column less min value', async () => {
        expect(() => new grid_size_1.GridSize(0, 0)).toThrow();
    });
    test('should create from state', async () => {
        const state = {
            rowCount: 2,
            columnCount: 3,
        };
        const size = new grid_size_1.GridSize(state);
        expect(size.rowCount).toEqual(2);
        expect(size.columnCount).toEqual(3);
    });
    test('should get state', async () => {
        const size = new grid_size_1.GridSize(2, 3);
        expect(size.getState()).toEqual({
            rowCount: 2,
            columnCount: 3,
        });
    });
});
