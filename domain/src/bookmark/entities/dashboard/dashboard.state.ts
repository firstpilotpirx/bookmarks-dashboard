import { GridState } from '../grid/grid.state';
import { GridSizeState } from '../grid-size/grid-size.state';

export interface DashboardState {
  defaultGridSize: GridSizeState;
  grids: GridState[];
}
