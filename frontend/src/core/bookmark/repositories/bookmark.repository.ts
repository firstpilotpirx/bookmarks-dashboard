import { BookmarkWithPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/bookmark-with-position';

export interface BookmarkRepository {
  createOne(url: string, name: string): Promise<void>;
  readAll(): Promise<BookmarkWithPosition[]>;
  deleteOne(id: string): Promise<void>;
}
