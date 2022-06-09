"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridBookmark = void 0;
const bookmark_with_position_1 = require("./bookmark-with-position");
class GridBookmark {
    rowsCount;
    columnsCount;
    grid = new Map();
    constructor(rowsCount, columnsCount) {
        this.rowsCount = rowsCount;
        this.columnsCount = columnsCount;
    }
    setBookmark(position, bookmark) {
        this.grid.set(JSON.stringify(position), bookmark);
    }
    readAll() {
        const bookmarks = [];
        this.grid.forEach((bookmark, position) => {
            bookmarks.push(new bookmark_with_position_1.BookmarkWithPosition(JSON.parse(position), bookmark));
        });
        return bookmarks;
    }
}
exports.GridBookmark = GridBookmark;
