import axios from 'axios';
import { PageIconMakerService } from '../../core/bookmark/services/page-icon-maker.service';

export enum IconSize {
  ICON_32 = '32',
  ICON_64 = '64',
  ICON_48 = '48',
  ICON_96 = '96',
  ICON_144 = '144',
}

export class PageIconMakerGoogleS2FaviconAxiosService implements PageIconMakerService {
  private size = IconSize.ICON_64;
  async makeBase64(url: string): Promise<string> {
    const hostname = new URL(url).hostname;
    const response = await axios.get(`https://www.google.com/s2/favicons?sz=${this.size}&domain_url=${hostname}`, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(response.data, 'binary').toString('base64');
  }
}
