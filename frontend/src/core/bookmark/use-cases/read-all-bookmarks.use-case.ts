import { GridBookmark } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-bookmark';
import { BookmarkRepository } from '../repositories/bookmark.repository';

export class ReadAllBookmarksUseCase {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(): Promise<GridBookmark> {
    const bookmarkWithPosition = await this.bookmarkRepository.readAll();
    return new GridBookmark(bookmarkWithPosition);
  }
}
