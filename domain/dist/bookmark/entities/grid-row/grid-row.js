"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridRow = void 0;
const bookmark_1 = require("../bookmark/bookmark");
class GridRow {
    bookmarks = [];
    constructor(size = 0) {
        if (Number.isNaN(Number(size))) {
            // @ts-ignore
            this.setState(size);
            return;
        }
        const bookmark = new Array();
        for (let i = 0; i < size; i++) {
            bookmark.push(undefined);
        }
        this.bookmarks = bookmark;
    }
    setSize(size) {
        if (size < 0) {
            throw new Error(`size should be positive, but size: ${size}`);
        }
        const bookmarks = new Array();
        for (let i = 0; i < size; i++) {
            if (i < this.bookmarks.length) {
                bookmarks.push(this.bookmarks[i]);
            }
            else {
                bookmarks.push(undefined);
            }
        }
        this.bookmarks = bookmarks;
    }
    addColumnAtTheEnd() {
        this.setSize(this.getSize() + 1);
    }
    deleteLastColumn() {
        this.setSize(this.getSize() - 1);
    }
    getSize() {
        return this.bookmarks.length;
    }
    setBookmark(position, bookmark) {
        if (position >= this.bookmarks.length) {
            throw new Error(`Can not set bookmark because out of range, rowSize=${this.bookmarks.length}, but position is=${position}`);
        }
        this.bookmarks[position] = bookmark;
    }
    getBookmark(position) {
        if (position >= this.bookmarks.length) {
            throw new Error(`Can not get bookmark because out of range, rowSize=${this.bookmarks.length}, but position is=${position}`);
        }
        return this.bookmarks[position];
    }
    getAllBookmarks() {
        return this.bookmarks;
    }
    getState() {
        return {
            bookmarks: this.bookmarks.map((bookmark) => (bookmark === undefined ? undefined : bookmark.getState())),
        };
    }
    deleteBookmark(position) {
        this.setBookmark(position, undefined);
    }
    setState(state) {
        this.bookmarks = state.bookmarks.map((state) => (state === undefined ? undefined : new bookmark_1.Bookmark(state)));
    }
}
exports.GridRow = GridRow;
