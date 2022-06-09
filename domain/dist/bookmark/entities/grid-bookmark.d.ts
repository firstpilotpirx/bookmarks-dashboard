import { Bookmark } from './bookmark';
import { GridPosition } from './grid-position';
import { BookmarkWithPosition } from './bookmark-with-position';
export declare class GridBookmark {
    rowsCount: number;
    columnsCount: number;
    private grid;
    constructor(rowsCount: number, columnsCount: number);
    setBookmark(position: GridPosition, bookmark: Bookmark): void;
    readAll(): BookmarkWithPosition[];
}
//# sourceMappingURL=grid-bookmark.d.ts.map