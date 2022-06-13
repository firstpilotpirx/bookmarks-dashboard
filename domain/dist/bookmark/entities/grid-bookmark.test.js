"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_bookmark_1 = require("./grid-bookmark");
const bookmark_with_position_1 = require("./bookmark-with-position");
const grid_position_1 = require("./grid-position");
const bookmark_1 = require("./bookmark");
describe('Unit Test', () => {
    test('should get by position', async () => {
        const bookmarkWithPositionSet = [
            new bookmark_with_position_1.BookmarkWithPosition(new grid_position_1.GridPosition(0, 0), new bookmark_1.Bookmark('0', 'http://localhost:1', '0', '0', '0')),
            new bookmark_with_position_1.BookmarkWithPosition(new grid_position_1.GridPosition(1, 1), new bookmark_1.Bookmark('1', 'http://localhost:1', '1', '1', '1')),
            new bookmark_with_position_1.BookmarkWithPosition(new grid_position_1.GridPosition(2, 2), new bookmark_1.Bookmark('2', 'http://localhost:2', '2', '2', '2')),
            new bookmark_with_position_1.BookmarkWithPosition(new grid_position_1.GridPosition(3, 3), new bookmark_1.Bookmark('3', 'http://localhost:3', '3', '3', '3')),
            new bookmark_with_position_1.BookmarkWithPosition(new grid_position_1.GridPosition(4, 4), new bookmark_1.Bookmark('4', 'http://localhost:4', '4', '4', '4')),
        ];
        const gridBookmark = new grid_bookmark_1.GridBookmark(bookmarkWithPositionSet);
        expect(gridBookmark.getBookmark(new grid_position_1.GridPosition(1, 1))).toEqual(new bookmark_1.Bookmark('1', 'http://localhost:1', '1', '1', '1'));
    });
});
