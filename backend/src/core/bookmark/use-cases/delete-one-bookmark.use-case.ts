import { BookmarkRepository } from '@bookmarks-dashboard/domain/dist/bookmark/repositories/bookmark.repository';

export class DeleteOneBookmarkUseCase {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}

  async execute(id: string): Promise<void> {
    await this.bookmarkRepository.deleteOne(id);
  }
}
