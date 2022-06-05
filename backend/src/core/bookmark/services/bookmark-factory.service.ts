import { Bookmark } from '../entities/bookmark';
import { UuidService } from './uuid.service';
import { PageIconMakerService } from './page-icon-maker.service';
import { PagePreviewMaker } from './page-preview-maker.service';
import { Base64ResizerService } from './base64-resizer.service';

export class BookmarkFactoryService {
  constructor(
    private readonly uuidService: UuidService,
    private readonly pageIconMakerService: PageIconMakerService,
    private readonly pagePreviewMaker: PagePreviewMaker,
    private readonly base64ResizerService: Base64ResizerService,
  ) {}
  async make(url: string, name: string): Promise<Bookmark> {
    const id = this.uuidService.generate();
    const [icon, preview] = await Promise.all([this.pageIconMakerService.makeBase64(url), this.pagePreviewMaker.makeBase64(url)]);
    const smallPreview = await this.base64ResizerService.resize(preview, 16 * 40, 9 * 40);

    return new Bookmark(id, url, name, icon, smallPreview);
  }
}
