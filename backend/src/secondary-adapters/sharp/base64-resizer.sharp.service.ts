import { Base64ResizerService } from '../../core/bookmark/services/base64-resizer.service';
import sharp from 'sharp';

export class Base64ResizerSharpService implements Base64ResizerService {
  async resize(base64Image: string, newWidth: number, newHeight: number): Promise<string> {
    const img = new Buffer(base64Image, 'base64');
    return (await sharp(img).resize(newWidth, newHeight).toBuffer()).toString('base64');
  }
}
