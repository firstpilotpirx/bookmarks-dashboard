import { BookmarkFactoryService } from '../services/bookmark-factory.service';
import { BookmarkRepository } from '@bookmarks-dashboard/domain/dist/bookmark/repositories/bookmark.repository';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';

export class CreateNewBookmarkUseCase {
  constructor(private readonly bookmarkFactoryService: BookmarkFactoryService, private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(position: GridPosition, url: string, name: string): Promise<void> {
    const bookmark = await this.bookmarkFactoryService.make(url, name);
    await this.bookmarkRepository.createOne(position, bookmark);
  }
}
