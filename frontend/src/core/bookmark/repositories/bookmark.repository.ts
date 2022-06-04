import { Bookmark } from '../entitties/bookmark';

export interface BookmarkRepository {
  createOne(url: string, name: string): Promise<void>;
  readAll(): Promise<Bookmark[]>;
}
