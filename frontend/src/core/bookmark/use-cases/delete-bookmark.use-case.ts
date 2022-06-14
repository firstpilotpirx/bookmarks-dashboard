import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { DashboardRepository } from '../repositories/dashboard.repository';

export class DeleteBookmarkUseCase {
  constructor(private readonly bookmarkRepository: DashboardRepository) {}

  async execute(gridIndex: number, position: GridPosition): Promise<void> {
    await this.bookmarkRepository.deleteBookmark(gridIndex, position);
  }
}
