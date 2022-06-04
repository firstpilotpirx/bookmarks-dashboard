import { Bookmark } from '../entities/bookmark';

export interface BookmarkRepository {
  createOne(bookmark: Bookmark): Promise<void>;
  readAll(): Promise<Bookmark[]>;
  deleteOne(id: string): Promise<void>;
}
