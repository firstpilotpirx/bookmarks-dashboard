import { Grid } from '../grid/grid';
import { GridSize } from '../grid-size/grid-size';
import { DashboardState } from './dashboard.state';
export declare class Dashboard {
    private grids;
    private defaultGridSize;
    constructor(defaultGridSize?: GridSize | DashboardState);
    createGrid(gridRowCount?: number, gridColumnCount?: number): void;
    getAllGrids(): Grid[];
    getGrid(gridIndex: number): Grid;
    deleteGrid(gridIndex: number): void;
    getState(): DashboardState;
    private setState;
}
//# sourceMappingURL=dashboard.d.ts.map