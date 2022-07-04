"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_position_1 = require("./grid-position");
describe('Unit Test GridPosition', () => {
    test('should create', async () => {
        const position = new grid_position_1.GridPosition(5, 7);
        expect(position.row).toEqual(5);
        expect(position.column).toEqual(7);
    });
    test('should create with min row and column', async () => {
        const position = new grid_position_1.GridPosition(0, 0);
        expect(position.row).toEqual(0);
        expect(position.column).toEqual(0);
    });
    test('should not create with negative row', async () => {
        expect(() => new grid_position_1.GridPosition(-1, 0)).toThrow();
    });
    test('should not create with negative column', async () => {
        expect(() => new grid_position_1.GridPosition(0, -1)).toThrow();
    });
    test('should not create with negative row and column', async () => {
        expect(() => new grid_position_1.GridPosition(-1, -1)).toThrow();
    });
    test('should create from state', async () => {
        const position = new grid_position_1.GridPosition({
            row: 5,
            column: 7,
        });
        expect(position.row).toEqual(5);
        expect(position.column).toEqual(7);
    });
    test('should get state', async () => {
        const position = new grid_position_1.GridPosition(5, 7);
        expect(position.getState()).toEqual({
            row: 5,
            column: 7,
        });
    });
});
