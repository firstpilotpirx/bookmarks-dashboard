import { DashboardRepository } from '../repositories/dashboardRepository';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';

export class DeleteOneBookmarkUseCase {
  constructor(private readonly bookmarkRepository: DashboardRepository) {}

  async execute(gridIndex: number, position: GridPosition): Promise<void> {
    const dashboard = await this.bookmarkRepository.read();
    dashboard.getGrid(gridIndex)?.deleteBookmark(position);
    await this.bookmarkRepository.save(dashboard);
  }
}
