import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { Dashboard } from '@bookmarks-dashboard/domain/dist/bookmark/entities/dashboard';

export interface DashboardRepository {
  readDashboard(): Promise<Dashboard>;

  createGrid(): Promise<void>;
  deleteGrid(gridIndex: number): Promise<void>;

  setBookmark(gridIndex: number, position: GridPosition, url: string, name: string): Promise<void>;
  deleteBookmark(gridIndex: number, position: GridPosition): Promise<void>;
}
