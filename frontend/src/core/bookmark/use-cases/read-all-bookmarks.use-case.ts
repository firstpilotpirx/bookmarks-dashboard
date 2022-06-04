import { Bookmark } from '../entitties/bookmark';
import { BookmarkRepository } from '../repositories/bookmark.repository';

export class ReadAllBookmarksUseCase {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(): Promise<Bookmark[]> {
    try {
      const book = await this.bookmarkRepository.readAll();
      console.log('>>>>', book);
    } catch (error) {
      console.log(error);
    }

    return this.bookmarkRepository.readAll();
  }
}
