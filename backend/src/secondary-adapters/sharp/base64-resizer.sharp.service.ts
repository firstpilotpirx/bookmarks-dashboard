import { Base64ResizerService } from '../../core/bookmark/services/base64-resizer.service';
import sharp from 'sharp';

export class Base64ResizerSharpService implements Base64ResizerService {
  async resize(base64Image: string): Promise<string> {
    const img = new Buffer(base64Image, 'base64');
    const metadata = await sharp(img).metadata();
    return (
      await sharp(img)
        .resize(null, null, {
          width: Math.floor(<number>metadata.width / 2),
        })
        .toFormat('jpeg')
        .jpeg({
          quality: 60,
          // chromaSubsampling: '4:4:4',
          force: true,
        })
        .toBuffer()
    ).toString('base64');
  }
}
