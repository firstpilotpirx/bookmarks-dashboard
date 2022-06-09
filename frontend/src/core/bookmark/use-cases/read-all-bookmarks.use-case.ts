import { BookmarkWithPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/bookmark-with-position';
import { BookmarkRepository } from '../repositories/bookmark.repository';

export class ReadAllBookmarksUseCase {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(): Promise<BookmarkWithPosition[]> {
    return this.bookmarkRepository.readAll();
  }
}
