import { Bookmark } from '../bookmark/bookmark';
import { GridRowState } from './grid-row-state';
export declare class GridRow {
    private bookmarks;
    constructor(size?: number | GridRowState);
    setSize(size: number): void;
    addColumnAtTheEnd(): void;
    deleteLastColumn(): void;
    getSize(): number;
    setBookmark(position: number, bookmark: Bookmark | undefined): void;
    getBookmark(position: number): Bookmark | undefined;
    getAllBookmarks(): Array<Bookmark | undefined>;
    getState(): GridRowState;
    deleteBookmark(position: number): void;
    private setState;
}
//# sourceMappingURL=grid-row.d.ts.map