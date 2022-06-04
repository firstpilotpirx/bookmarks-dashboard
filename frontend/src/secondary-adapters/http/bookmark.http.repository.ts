import axios from 'axios';
import { BookmarkRepository } from '../../core/bookmark/repositories/bookmark.repository';
import { Bookmark } from '../../core/bookmark/entitties/bookmark';

export class BookmarkHttpRepository implements BookmarkRepository {
  async createOne(url: string, name: string): Promise<void> {
    await axios.post('http://localhost:3334/bookmark', {
      url,
      name,
    });
  }

  async readAll(): Promise<Bookmark[]> {
    const response = await axios.get<Bookmark[]>('http://localhost:3334/bookmark');
    return response.data.map(
      (bookmark) => new Bookmark(bookmark.id, bookmark.url, bookmark.name, bookmark.previewBase64, bookmark.iconBase64),
    );
  }

  async deleteOne(id: string): Promise<void> {
    await axios.delete(`http://localhost:3334/bookmark/${id}`);
  }
}
