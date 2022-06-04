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
    const response = await axios.get<{ url: string; name: string; previewBase64: string; iconBase64: string }[]>(
      'http://localhost:3334/bookmark',
    );
    return response.data.map((bookmark) => new Bookmark(bookmark.name, bookmark.url, bookmark.previewBase64, bookmark.iconBase64));
  }
}
