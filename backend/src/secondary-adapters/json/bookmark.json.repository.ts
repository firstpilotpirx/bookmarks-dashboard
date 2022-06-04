import { Bookmark } from '../../core/bookmark/entities/bookmark';
import { BookmarkRepository } from '../../core/bookmark/repositories/bookmark.repository';
import * as fs from 'fs';

export class BookmarkJsonRepository implements BookmarkRepository {
  private inMemoryRepository: Bookmark[] = [];

  constructor() {
    this.load();
  }
  async createOne(bookmark: Bookmark): Promise<void> {
    this.inMemoryRepository.push(bookmark);
    this.save();
  }

  async readAll(): Promise<Bookmark[]> {
    return this.inMemoryRepository;
  }

  async deleteOne(id: string): Promise<void> {
    this.inMemoryRepository = this.inMemoryRepository.filter((bookmark) => bookmark.id !== id);
    this.save();
  }

  private save(): void {
    fs.writeFileSync('./bookmarks.repository.json', JSON.stringify(this.inMemoryRepository, null, 2));
  }

  private load(): void {
    this.inMemoryRepository = JSON.parse(fs.readFileSync('./bookmarks.repository.json').toString());
  }
}
