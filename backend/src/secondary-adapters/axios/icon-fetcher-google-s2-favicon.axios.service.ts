import axios from 'axios';
import { LinkRefIconFetcherService } from '../../core/bookmark/services/link-ref-icon-fetcher.service';

export enum IconSize {
  ICON_32 = '32',
  ICON_64 = '64',
  ICON_48 = '48',
  ICON_96 = '96',
  ICON_144 = '144',
}

export class IconFetcherGoogleS2FaviconAxiosService implements LinkRefIconFetcherService {
  private size = IconSize.ICON_64;
  async fetch(hostname: string): Promise<string> {
    const response = await axios.get(`https://www.google.com/s2/favicons?sz=${this.size}&domain_url=${hostname}`, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(response.data, 'binary').toString('base64');
  }
}
