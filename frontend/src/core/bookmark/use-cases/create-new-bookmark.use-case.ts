import { BookmarkRepository } from '../repositories/bookmark.repository';

export class CreateNewBookmarkUseCase {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {
  }

  async execute(url: string, name: string): Promise<void> {
    await this.bookmarkRepository.createOne(url, name);
  }
}
