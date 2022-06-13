import { BookmarkWithPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/bookmark-with-position';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';

export interface BookmarkRepository {
  createOne(position: GridPosition, url: string, name: string): Promise<void>;
  readAll(): Promise<BookmarkWithPosition[]>;
  deleteOne(id: string): Promise<void>;
}
