import axios from 'axios';
import { IconFetcherService } from '../../core/bookmark/services/icon-fetcher.service';

export class IconFetcherFaviconAxiosService implements IconFetcherService {
  async fetch(hostname: string): Promise<string> {
    const response = await axios.get(`https://${hostname}/favicon.ico`);
    return Buffer.from(response.data, 'binary').toString('base64');
  }
}
