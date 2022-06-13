"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("./grid");
const bookmark_1 = require("./bookmark");
const grid_position_1 = require("./grid-position");
const grid_size_1 = require("./grid-size");
describe('Unit Test Grid', () => {
    test('should create with row and colum', async () => {
        const grid = new grid_1.Grid(new grid_size_1.GridSize(7, 5));
        expect(grid.size.rowCount).toEqual(7);
        expect(grid.size.columnCount).toEqual(5);
    });
    test('should create with min row and min colum', async () => {
        const grid = new grid_1.Grid(new grid_size_1.GridSize(1, 1));
        expect(grid.size.rowCount).toEqual(1);
        expect(grid.size.columnCount).toEqual(1);
    });
    test('should set and get bookmarks', async () => {
        const bookmark1 = new bookmark_1.Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const bookmark2 = new bookmark_1.Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const bookmark3 = new bookmark_1.Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const grid = new grid_1.Grid(new grid_size_1.GridSize(5, 5));
        grid.setBookmark(new grid_position_1.GridPosition(0, 0), bookmark1);
        grid.setBookmark(new grid_position_1.GridPosition(2, 2), bookmark2);
        grid.setBookmark(new grid_position_1.GridPosition(4, 4), bookmark3);
        expect(grid.getBookmark(new grid_position_1.GridPosition(0, 0))).toEqual(bookmark1);
        expect(grid.getBookmark(new grid_position_1.GridPosition(2, 2))).toEqual(bookmark2);
        expect(grid.getBookmark(new grid_position_1.GridPosition(4, 4))).toEqual(bookmark3);
    });
    test('should not set bookmarks because position out of range', async () => {
        const bookmark = new bookmark_1.Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const grid = new grid_1.Grid(new grid_size_1.GridSize(5, 5));
        expect(() => grid.setBookmark(new grid_position_1.GridPosition(5, 5), bookmark)).toThrow();
    });
    test('should not get bookmarks because position out of range', async () => {
        const grid = new grid_1.Grid(new grid_size_1.GridSize(5, 5));
        expect(() => grid.getBookmark(new grid_position_1.GridPosition(5, 5))).toThrow();
    });
    test('should get undefined instead bookmarks', async () => {
        const grid = new grid_1.Grid(new grid_size_1.GridSize(5, 5));
        expect(grid.getBookmark(new grid_position_1.GridPosition(0, 0))).toEqual(undefined);
    });
    test('should delete bookmarks', async () => {
        const bookmark = new bookmark_1.Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const grid = new grid_1.Grid(new grid_size_1.GridSize(5, 5));
        const position = new grid_position_1.GridPosition(2, 2);
        grid.setBookmark(position, bookmark);
        expect(grid.getBookmark(new grid_position_1.GridPosition(2, 2))).toEqual(bookmark);
        grid.deleteBookmark(position);
        expect(grid.getBookmark(new grid_position_1.GridPosition(2, 2))).toEqual(undefined);
    });
    test('should get all rows', async () => {
        const bookmark1 = new bookmark_1.Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const bookmark2 = new bookmark_1.Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const bookmark3 = new bookmark_1.Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const grid = new grid_1.Grid(new grid_size_1.GridSize(5, 5));
        grid.setBookmark(new grid_position_1.GridPosition(0, 0), bookmark1);
        grid.setBookmark(new grid_position_1.GridPosition(2, 2), bookmark2);
        grid.setBookmark(new grid_position_1.GridPosition(4, 4), bookmark3);
        expect(grid.getAllRows()).toEqual([
            [bookmark1, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, bookmark2, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, bookmark3],
        ]);
    });
    test('should get state', async () => {
        const bookmark1 = new bookmark_1.Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const bookmark2 = new bookmark_1.Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const bookmark3 = new bookmark_1.Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const size = new grid_size_1.GridSize(5, 5);
        const grid = new grid_1.Grid(size, 'name');
        grid.setBookmark(new grid_position_1.GridPosition(0, 0), bookmark1);
        grid.setBookmark(new grid_position_1.GridPosition(2, 2), bookmark2);
        grid.setBookmark(new grid_position_1.GridPosition(4, 4), bookmark3);
        expect(grid.getState()).toEqual({
            name: 'name',
            size: size.getState(),
            grid: [
                [bookmark1.getState(), undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, bookmark2.getState(), undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, bookmark3.getState()],
            ],
        });
    });
    test('should create from state', async () => {
        const bookmark1 = new bookmark_1.Bookmark('id1', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const bookmark2 = new bookmark_1.Bookmark('id2', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const bookmark3 = new bookmark_1.Bookmark('id3', 'https://www.localhost.org', 'name', 'icon', 'preview');
        const size = new grid_size_1.GridSize(5, 5);
        const gridState = {
            name: 'name',
            size: size.getState(),
            grid: [
                [bookmark1.getState(), undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, bookmark2.getState(), undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, bookmark3.getState()],
            ],
        };
        const grid = new grid_1.Grid(gridState);
        expect(grid.name).toEqual('name');
        expect(grid.size).toEqual(size);
        expect(grid.getAllRows()).toEqual([
            [bookmark1, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, bookmark2, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, undefined, bookmark3],
        ]);
    });
});
