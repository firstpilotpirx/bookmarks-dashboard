import { BookmarkFactoryService } from '../services/bookmark-factory.service';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { DashboardRepository } from '../repositories/dashboardRepository';

export class SetNewBookmarkUseCase {
  constructor(private readonly bookmarkFactoryService: BookmarkFactoryService, private readonly bookmarkRepository: DashboardRepository) {}

  async execute(gridIndex: number, position: GridPosition, url: string, name: string): Promise<void> {
    const dashboard = await this.bookmarkRepository.read();

    const bookmark = await this.bookmarkFactoryService.make(url, name);
    dashboard.getGrid(gridIndex)?.setBookmark(position, bookmark);

    await this.bookmarkRepository.save(dashboard);
  }
}
