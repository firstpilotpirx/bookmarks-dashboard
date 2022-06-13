import { GridState } from './grid.state';
import { GridSizeState } from './grid-size.state';

export interface DashboardState {
  defaultGridSize: GridSizeState;
  grids: GridState[];
}
