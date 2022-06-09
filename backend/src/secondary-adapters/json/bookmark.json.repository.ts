import * as fs from 'fs';
import { Bookmark } from '@bookmarks-dashboard/domain/dist/bookmark/entities/bookmark';
import { BookmarkRepository } from '@bookmarks-dashboard/domain/dist/bookmark/repositories/bookmark.repository';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { BookmarkWithPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/bookmark-with-position';

export class BookmarkJsonRepository implements BookmarkRepository {
  private inMemoryRepository = new Map<string, Bookmark>();

  constructor() {
    this.load();
  }
  async createOne(position: GridPosition, bookmark: Bookmark): Promise<void> {
    this.inMemoryRepository.set(JSON.stringify(position), bookmark);
    this.save();
  }

  async readAll(): Promise<BookmarkWithPosition[]> {
    return this.toBookmarkWithPosition();
  }

  async deleteOne(id: string): Promise<void> {
    this.inMemoryRepository.forEach((bookmark, position) => {
      if (bookmark.id === id) {
        this.inMemoryRepository.delete(position);
      }
    });
    this.save();
  }

  private save(): void {
    const state = this.toBookmarkWithPosition();
    fs.writeFileSync('./bookmarks.repository.json', JSON.stringify(state, null, 2));
  }

  private load(): void {
    const state = JSON.parse(fs.readFileSync('./bookmarks.repository.json').toString()) as BookmarkWithPosition[];
    this.fromBookmarkWithPosition(state);
  }

  private toBookmarkWithPosition(): BookmarkWithPosition[] {
    const state: BookmarkWithPosition[] = [];
    this.inMemoryRepository.forEach((bookmark, position) =>
      state.push(new BookmarkWithPosition(JSON.parse(position) as GridPosition, bookmark)),
    );

    return state;
  }

  private fromBookmarkWithPosition(bookmarkWithPositions: BookmarkWithPosition[]): void {
    const newInMemoryRepository = new Map<string, Bookmark>();
    bookmarkWithPositions.forEach((bookmarkWithPositions) =>
      newInMemoryRepository.set(JSON.stringify(bookmarkWithPositions.position), bookmarkWithPositions.bookmark),
    );

    this.inMemoryRepository = newInMemoryRepository;
  }
}
