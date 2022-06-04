import { Bookmark } from '../../core/bookmark/entities/bookmark';
import { BookmarkRepository } from '../../core/bookmark/repositories/bookmark.repository';

export class BookmarkSqliteRepository implements BookmarkRepository {
  private inMemoryRepository: Bookmark[] = [];

  async createOne(bookmark: Bookmark): Promise<void> {
    this.inMemoryRepository.push(bookmark);
  }

  async readAll(): Promise<Bookmark[]> {
    return this.inMemoryRepository;
  }
}
