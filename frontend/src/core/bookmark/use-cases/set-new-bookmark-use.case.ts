import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { BookmarkRepository } from '../repositories/bookmark.repository';

export class SetNewBookmarkUseCase {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(position: GridPosition, url: string, name: string): Promise<void> {
    await this.bookmarkRepository.createOne(position, url, name);
  }
}
