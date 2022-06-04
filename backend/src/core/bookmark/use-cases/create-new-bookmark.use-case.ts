import { BookmarkRepository } from '../repositories/bookmark.repository';
import { BookmarkFactoryService } from '../services/bookmark-factory.service';

export class CreateNewBookmarkUseCase {
  constructor(private readonly bookmarkFactoryService: BookmarkFactoryService, private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(url: string, name: string): Promise<void> {
    const bookmark = await this.bookmarkFactoryService.make(url, name);
    await this.bookmarkRepository.createOne(bookmark);
  }
}
