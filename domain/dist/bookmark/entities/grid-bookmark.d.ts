import { Bookmark } from './bookmark';
import { GridPosition } from './grid-position';
import { BookmarkWithPosition } from './bookmark-with-position';
export declare class GridBookmark {
    private grid;
    rowsCount: number;
    columnsCount: number;
    constructor(rowsCount: number | BookmarkWithPosition[], columnsCount?: number);
    setBookmark(position: GridPosition, bookmark: Bookmark): void;
    getBookmark(position: GridPosition): Bookmark | undefined;
    readAll(): BookmarkWithPosition[];
    private loadFromBookmarkWithPosition;
}
//# sourceMappingURL=grid-bookmark.d.ts.map