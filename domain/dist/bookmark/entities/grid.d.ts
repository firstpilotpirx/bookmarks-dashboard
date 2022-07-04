import { Bookmark } from './bookmark';
import { GridPosition } from './grid-position';
import { GridSize } from './grid-size';
import { GridState } from './grid.state';
export declare class Grid {
    name: string;
    private grid;
    size: GridSize;
    constructor(size: GridSize | GridState, name?: string);
    setBookmark(position: GridPosition, bookmark: Bookmark): void;
    getBookmark(position: GridPosition): Bookmark | undefined;
    getAllRows(): Array<Array<Bookmark | undefined>>;
    deleteBookmark(position: GridPosition): void;
    getState(): GridState;
    private setState;
}
//# sourceMappingURL=grid.d.ts.map