import { PagePreviewMaker } from '../../core/bookmark/services/page-preview-maker.service';
import { webkit } from 'playwright';

export class PagePreviewMakerPlaywrightService implements PagePreviewMaker {
  constructor(private readonly width = 1600, private readonly height = 900) {}
  async makeBase64(url: string): Promise<string> {
    const browser = await webkit.launch({
      headless: true,
      timeout: 60000,
      args: [`--window-size=${this.width},${this.height}`],
    });

    const page = await browser.newPage({ viewport: { width: this.width, height: this.height } });
    await page.goto(url, { timeout: 60000, waitUntil: 'load' });
    const base64 = (await page.screenshot()).toString('base64');
    await page.close();
    await browser.close();

    return base64;
  }
}
