import { Bookmark } from '../entities/bookmark';
import { GridPosition } from '../entities/grid-position';
import { BookmarkWithPosition } from '../entities/bookmark-with-position';
export interface BookmarkRepository {
    createOne(position: GridPosition, bookmark: Bookmark): Promise<void>;
    readAll(): Promise<BookmarkWithPosition[]>;
    deleteOne(id: string): Promise<void>;
}
//# sourceMappingURL=bookmark.repository.d.ts.map