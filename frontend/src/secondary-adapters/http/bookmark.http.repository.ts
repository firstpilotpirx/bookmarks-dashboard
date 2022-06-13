import axios from 'axios';
import { BookmarkWithPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/bookmark-with-position';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { Bookmark } from '@bookmarks-dashboard/domain/dist/bookmark/entities/bookmark';
import { BookmarkRepository } from '../../core/bookmark/repositories/bookmark.repository';

export class BookmarkHttpRepository implements BookmarkRepository {
  async createOne(position: GridPosition, url: string, name: string): Promise<void> {
    await axios.post('http://localhost:3334/bookmark', {
      position,
      url,
      name,
    });
  }

  async readAll(): Promise<BookmarkWithPosition[]> {
    const response = await axios.get<BookmarkWithPosition[]>('http://localhost:3334/bookmark');
    return response.data.map(
      (bookmarkWithPosition) =>
        new BookmarkWithPosition(
          new GridPosition(bookmarkWithPosition.position.row, bookmarkWithPosition.position.column),
          new Bookmark(
            bookmarkWithPosition.bookmark.id,
            bookmarkWithPosition.bookmark.url,
            bookmarkWithPosition.bookmark.name,
            bookmarkWithPosition.bookmark.iconBase64,
            bookmarkWithPosition.bookmark.previewBase64,
          ),
        ),
    );
  }

  async deleteOne(id: string): Promise<void> {
    await axios.delete(`http://localhost:3334/bookmark/${id}`);
  }
}
