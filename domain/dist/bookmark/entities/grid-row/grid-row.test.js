"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_row_1 = require("./grid-row");
const bookmark_1 = require("../bookmark/bookmark");
describe('Unit Test GridRow', () => {
    const bookmark0 = new bookmark_1.Bookmark('id0', 'https://stackoverflow0.com', 'name0', 'icon0', 'preview0');
    const bookmark2 = new bookmark_1.Bookmark('id2', 'https://stackoverflow2.com', 'name2', 'icon2', 'preview2');
    test('should create with default param', async () => {
        const row = new grid_row_1.GridRow();
        expect(row.getSize()).toEqual(0);
        expect(row.getAllBookmarks()).toEqual([]);
    });
    test('should create with custom param', async () => {
        const row = new grid_row_1.GridRow(3);
        row.setBookmark(0, bookmark0);
        row.setBookmark(2, bookmark2);
        expect(row.getSize()).toEqual(3);
        expect(row.getAllBookmarks()).toEqual([bookmark0, undefined, bookmark2]);
    });
    test('should set size less', async () => {
        const row = new grid_row_1.GridRow(3);
        row.setBookmark(0, bookmark0);
        row.setBookmark(2, bookmark2);
        row.setSize(2);
        expect(row.getSize()).toEqual(2);
        expect(row.getAllBookmarks()).toEqual([bookmark0, undefined]);
    });
    test('should set size more', async () => {
        const row = new grid_row_1.GridRow(3);
        row.setBookmark(0, bookmark0);
        row.setBookmark(2, bookmark2);
        row.setSize(4);
        expect(row.getSize()).toEqual(4);
        expect(row.getAllBookmarks()).toEqual([bookmark0, undefined, bookmark2, undefined]);
    });
    test('should set zero size', async () => {
        const row = new grid_row_1.GridRow(3);
        row.setSize(0);
        expect(row.getSize()).toEqual(0);
    });
    test('should not set size because size less than 0', async () => {
        const row = new grid_row_1.GridRow(3);
        expect(() => row.setSize(-1)).toThrow();
    });
    test('should set bookmark', async () => {
        const row = new grid_row_1.GridRow(3);
        row.setBookmark(2, bookmark0);
        expect(row.getBookmark(2)).toEqual(bookmark0);
    });
    test('should not set bookmark because out of range', async () => {
        const row = new grid_row_1.GridRow(3);
        expect(() => row.setBookmark(3, bookmark0)).toThrow();
    });
    test('should get empty bookmark', async () => {
        const row = new grid_row_1.GridRow(3);
        row.setBookmark(2, bookmark0);
        expect(row.getBookmark(1)).toEqual(undefined);
    });
    test('should not get bookmark because out of range', async () => {
        const row = new grid_row_1.GridRow(3);
        expect(() => row.getBookmark(3)).toThrow();
    });
    test('should get all bookmarks', async () => {
        const row = new grid_row_1.GridRow(3);
        row.setBookmark(0, bookmark0);
        row.setBookmark(2, bookmark2);
        expect(row.getAllBookmarks()).toEqual([bookmark0, undefined, bookmark2]);
    });
    test('should get right state', async () => {
        const row = new grid_row_1.GridRow(3);
        row.setBookmark(0, bookmark0);
        row.setBookmark(2, bookmark2);
        expect(row.getState()).toEqual({
            bookmarks: [bookmark0.getState(), undefined, bookmark2.getState()],
        });
    });
    test('should create from state', async () => {
        const row = new grid_row_1.GridRow({
            bookmarks: [bookmark0.getState(), undefined, bookmark2.getState()],
        });
        expect(row.getState()).toEqual({
            bookmarks: [bookmark0.getState(), undefined, bookmark2.getState()],
        });
    });
    test('should get right state', async () => {
        const row = new grid_row_1.GridRow(3);
        row.setBookmark(0, bookmark0);
        row.setBookmark(2, bookmark2);
        expect(row.getState()).toEqual({
            bookmarks: [bookmark0.getState(), undefined, bookmark2.getState()],
        });
    });
    test('should get right state', async () => {
        const row = new grid_row_1.GridRow(3);
        row.setBookmark(0, bookmark0);
        row.setBookmark(2, bookmark2);
        row.deleteBookmark(2);
        expect(row.getState()).toEqual({
            bookmarks: [bookmark0.getState(), undefined, undefined],
        });
    });
    test('should add column', async () => {
        const row = new grid_row_1.GridRow(3);
        row.addColumnAtTheEnd();
        expect(row.getSize()).toEqual(4);
        expect(row.getAllBookmarks()).toEqual([undefined, undefined, undefined, undefined]);
    });
    test('should delete column', async () => {
        const row = new grid_row_1.GridRow(3);
        row.deleteLastColumn();
        expect(row.getSize()).toEqual(2);
        expect(row.getAllBookmarks()).toEqual([undefined, undefined]);
    });
});
