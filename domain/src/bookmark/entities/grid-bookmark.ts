import { Bookmark } from './bookmark';
import { GridPosition } from './grid-position';
import { BookmarkWithPosition } from './bookmark-with-position';

export class GridBookmark {
  private grid = new Map<string, Bookmark>();

  constructor(public rowsCount: number, public columnsCount: number) {}

  setBookmark(position: GridPosition, bookmark: Bookmark): void {
    this.grid.set(JSON.stringify(position), bookmark);
  }

  readAll(): BookmarkWithPosition[] {
    const bookmarks: BookmarkWithPosition[] = [];
    this.grid.forEach((bookmark, position) => {
      bookmarks.push(new BookmarkWithPosition(JSON.parse(position) as GridPosition, bookmark));
    });

    return bookmarks;
  }
}
