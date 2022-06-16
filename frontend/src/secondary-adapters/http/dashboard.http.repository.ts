import axios from 'axios';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { Dashboard } from '@bookmarks-dashboard/domain/dist/bookmark/entities/dashboard';
import { DashboardState } from '@bookmarks-dashboard/domain/dist/bookmark/entities/dashboard.state';
import { DashboardRepository } from '../../core/bookmark/repositories/dashboard.repository';

export class DashboardHttpRepository implements DashboardRepository {
  async readDashboard(): Promise<Dashboard> {
    const response = await axios.get<DashboardState>('http://localhost:3334/dashboard');
    return new Dashboard(response.data);
  }

  createGrid(): Promise<void> {
    return axios.post('http://localhost:3334/dashboard/grid');
  }

  deleteGrid(gridIndex: number): Promise<void> {
    return axios.delete(`http://localhost:3334/dashboard/grid/${gridIndex}`);
  }

  async setBookmark(gridIndex: number, position: GridPosition, url: string, name: string): Promise<void> {
    await axios.put(`http://localhost:3334/dashboard/grid/${gridIndex}/row/${position.row}/column/${position.column}`, {
      url,
      name,
    });
  }

  deleteBookmark(gridIndex: number, position: GridPosition): Promise<void> {
    return axios.delete(`http://localhost:3334/dashboard/grid/${gridIndex}/row/${position.row}/column/${position.column}`);
  }

  async changeGridName(gridIndex: number, newName: string): Promise<void> {
    await axios.put(`http://localhost:3334/dashboard/grid/${gridIndex}/name`, {
      newName,
    });
  }
}
