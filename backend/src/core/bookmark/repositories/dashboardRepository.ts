import { Dashboard } from '@bookmarks-dashboard/domain/dist/bookmark/entities/dashboard';

export interface DashboardRepository {
  read(): Promise<Dashboard>;
  save(dashboardState: Dashboard): Promise<void>;
}
