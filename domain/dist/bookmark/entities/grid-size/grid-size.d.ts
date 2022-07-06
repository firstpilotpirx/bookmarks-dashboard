import { GridSizeState } from './grid-size.state';
export declare class GridSize {
    private state;
    constructor(rowCount: number | GridSizeState, columnCount?: number);
    get rowCount(): number;
    get columnCount(): number;
    getState(): GridSizeState;
}
//# sourceMappingURL=grid-size.d.ts.map