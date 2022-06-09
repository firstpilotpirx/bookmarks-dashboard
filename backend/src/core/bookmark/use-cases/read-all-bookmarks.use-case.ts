import { BookmarkRepository } from '@bookmarks-dashboard/domain/dist/bookmark/repositories/bookmark.repository';
import { BookmarkWithPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/bookmark-with-position';

export class ReadAllBookmarksUseCase {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(): Promise<BookmarkWithPosition[]> {
    return this.bookmarkRepository.readAll();
  }
}
