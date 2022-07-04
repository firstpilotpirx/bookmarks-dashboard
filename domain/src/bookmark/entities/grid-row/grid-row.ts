import { Bookmark } from '../bookmark/bookmark';
import { GridRowState } from './grid-row-state';

export class GridRow {
  private bookmarks: Array<Bookmark | undefined> = [];

  constructor(size: number | GridRowState = 0) {
    if (size instanceof GridRowState) {
      this.setState(size);
      return;
    }

    const bookmark = new Array<Bookmark | undefined>();
    for (let i = 0; i < size; i++) {
      bookmark.push(undefined);
    }

    this.bookmarks = bookmark;
  }

  setSize(size: number): void {
    if (size < 0) {
      throw new Error(`size should be positive, but size: ${size}`);
    }

    const bookmarks = new Array<Bookmark | undefined>();
    for (let i = 0; i < size; i++) {
      if (i < this.bookmarks.length) {
        bookmarks.push(this.bookmarks[i]);
      } else {
        bookmarks.push(undefined);
      }
    }

    this.bookmarks = bookmarks;
  }

  getSize(): number {
    return this.bookmarks.length;
  }

  setBookmark(position: number, bookmark: Bookmark): void {
    if (position >= this.bookmarks.length) {
      throw new Error(`Can not set bookmark because out of range, rowSize=${this.bookmarks.length}, but position is=${position}`);
    }

    this.bookmarks[position] = bookmark;
  }

  getBookmark(position: number): Bookmark | undefined {
    if (position >= this.bookmarks.length) {
      throw new Error(`Can not get bookmark because out of range, rowSize=${this.bookmarks.length}, but position is=${position}`);
    }

    return this.bookmarks[position];
  }

  getAllBookmarks(): Array<Bookmark | undefined> {
    return this.bookmarks;
  }

  getState(): GridRowState {
    return {
      bookmarks: this.bookmarks.map((bookmark) => (bookmark === undefined ? undefined : bookmark.getState())),
    };
  }

  private setState(state: GridRowState): void {
    this.bookmarks = state.bookmarks.map((state) => (state === undefined ? undefined : new Bookmark(state)));
  }
}
