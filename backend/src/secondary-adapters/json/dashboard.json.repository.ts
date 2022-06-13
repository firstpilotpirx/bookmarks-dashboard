import * as fs from 'fs';
import { DashboardRepository } from '../../core/bookmark/repositories/dashboardRepository';
import { DashboardState } from '@bookmarks-dashboard/domain/dist/bookmark/entities/dashboard.state';
import { Dashboard } from '@bookmarks-dashboard/domain/dist/bookmark/entities/dashboard';

export class DashboardJsonRepository implements DashboardRepository {
  private path = './bookmarks.repository.json';

  async read(): Promise<Dashboard> {
    this.checkIfRepositoryInit();
    return new Dashboard(JSON.parse(fs.readFileSync(this.path).toString()) as DashboardState);
  }

  async save(dashboard: Dashboard): Promise<void> {
    this.checkIfRepositoryInit();
    fs.writeFileSync(this.path, JSON.stringify(dashboard.getState(), null, 2));
  }

  private checkIfRepositoryInit(): void {
    if (!fs.existsSync(this.path)) {
      this.initRepository();
    }
  }

  private initRepository(): void {
    fs.writeFileSync(this.path, JSON.stringify(new Dashboard().getState(), null, 2));
  }
}
