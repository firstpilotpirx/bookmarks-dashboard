import { Bookmark } from '../entities/bookmark';
import { BookmarkRepository } from '../repositories/bookmark.repository';
import { PageScreenshotMaker } from '../services/page-screenshot-maker.service';
import { Base64ResizerService } from '../services/base64-resizer.service';
import { IconFetcherService } from '../services/icon-fetcher.service';

export class CreateNewBookmarkUseCase {
  constructor(
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly pageScreenshotMaker: PageScreenshotMaker,
    private readonly base64ResizerService: Base64ResizerService,
    private readonly iconFetcherService: IconFetcherService,
  ) {}

  async execute(url: string, name: string): Promise<void> {
    const iconInBase64 = await this.iconFetcherService.fetch(new URL(url).hostname);
    const previewInBase64 = await this.takeSitePreview(url);
    const bookmark = new Bookmark(name, url, previewInBase64, iconInBase64);
    await this.bookmarkRepository.createOne(bookmark);
  }

  private async takeSitePreview(url: string): Promise<string> {
    const screenshotInBase64 = await this.pageScreenshotMaker.takeBase64(url);
    const smallScreenshotInBase64 = await this.base64ResizerService.resize(screenshotInBase64, 16 * 40, 9 * 40);
    return smallScreenshotInBase64;
  }
}
