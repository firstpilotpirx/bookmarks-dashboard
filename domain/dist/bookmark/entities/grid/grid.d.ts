import { Bookmark } from '../bookmark/bookmark';
import { GridPosition } from '../grid-position/grid-position';
import { GridSize } from '../grid-size/grid-size';
import { GridState } from './grid.state';
import { GridRow } from '../grid-row/grid-row';
export declare class Grid {
    name: string;
    private grid;
    size: GridSize;
    constructor(size: GridSize | GridState, name?: string);
    setBookmark(position: GridPosition, bookmark: Bookmark): void;
    getBookmark(position: GridPosition): Bookmark | undefined;
    getRow(rowIndex: number): GridRow;
    getAllRows(): Array<GridRow>;
    deleteBookmark(position: GridPosition): void;
    getSize(): GridSize;
    setSize(size: GridSize): void;
    addRowAtTheEnd(): void;
    deleteLastRow(): void;
    addColumnAtTheEnd(): void;
    deleteLastColumn(): void;
    getState(): GridState;
    private setState;
}
//# sourceMappingURL=grid.d.ts.map