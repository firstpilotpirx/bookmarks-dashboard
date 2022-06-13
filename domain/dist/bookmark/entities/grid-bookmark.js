"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridBookmark = void 0;
const bookmark_with_position_1 = require("./bookmark-with-position");
class GridBookmark {
    grid = new Map();
    rowsCount;
    columnsCount;
    constructor(rowsCount, columnsCount) {
        if (typeof rowsCount === 'number') {
            this.rowsCount = rowsCount;
            if (columnsCount === undefined) {
                throw new Error('You should set columnsCount');
            }
            this.columnsCount = columnsCount;
        }
        else {
            this.loadFromBookmarkWithPosition(rowsCount);
        }
    }
    setBookmark(position, bookmark) {
        this.grid.set(JSON.stringify(position), bookmark);
    }
    getBookmark(position) {
        console.log('>>> getBookmark', JSON.stringify(position));
        console.log(this.grid.keys());
        return this.grid.get(JSON.stringify(position));
    }
    readAll() {
        const bookmarks = [];
        this.grid.forEach((bookmark, position) => {
            bookmarks.push(new bookmark_with_position_1.BookmarkWithPosition(JSON.parse(position), bookmark));
        });
        return bookmarks;
    }
    loadFromBookmarkWithPosition(bookmarkWithPositionSet) {
        bookmarkWithPositionSet.forEach((bookmarkWithPosition) => this.setBookmark(bookmarkWithPosition.position, bookmarkWithPosition.bookmark));
    }
}
exports.GridBookmark = GridBookmark;
