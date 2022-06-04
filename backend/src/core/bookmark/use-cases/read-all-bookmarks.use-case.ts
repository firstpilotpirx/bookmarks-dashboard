import { BookmarkRepository } from '../repositories/bookmark.repository';
import { Bookmark } from '../entities/bookmark';

export class ReadAllBookmarksUseCase {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(): Promise<Bookmark[]> {
    return this.bookmarkRepository.readAll();
  }
}
