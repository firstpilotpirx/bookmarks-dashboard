import axios from 'axios';
import { PageIconMakerService } from '../../core/bookmark/services/page-icon-maker.service';

export class PageIconMakerFaviconAxiosService implements PageIconMakerService {
  async makeBase64(hostname: string): Promise<string> {
    const response = await axios.get(`https://${hostname}/favicon.ico`);
    return Buffer.from(response.data, 'binary').toString('base64');
  }
}
