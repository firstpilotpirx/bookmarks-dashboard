import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { DashboardRepository } from '../repositories/dashboard.repository';

export class SetNewBookmarkUseCase {
  constructor(private readonly bookmarkRepository: DashboardRepository) {}

  async execute(gridIndex: number, position: GridPosition, url: string, name: string): Promise<void> {
    await this.bookmarkRepository.setBookmark(gridIndex, position, url, name);
  }
}
