import { Dashboard } from '@bookmarks-dashboard/domain/dist/bookmark/entities/dashboard';
import { DashboardRepository } from '../repositories/dashboard.repository';

export class ReadDashboardUseCase {
  constructor(private readonly bookmarkRepository: DashboardRepository) {}

  async execute(): Promise<Dashboard> {
    return this.bookmarkRepository.readDashboard();
  }
}
