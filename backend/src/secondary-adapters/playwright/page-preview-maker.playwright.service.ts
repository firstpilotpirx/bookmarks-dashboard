import { PagePreviewMaker } from '../../core/bookmark/services/page-preview-maker.service';
import { chromium } from 'playwright';

export class PagePreviewMakerPlaywrightService implements PagePreviewMaker {
  constructor(private readonly width = 1600, private readonly height = 900) {}
  async makeBase64(url: string): Promise<string> {
    const browser = await chromium.launch({
      headless: true,
      timeout: 60000,
    });

    const page = await browser.newPage();
    await page.setViewportSize({ width: this.width, height: this.height });
    await page.goto(url, { timeout: 60000, waitUntil: 'networkidle' });
    const base64 = (await page.screenshot()).toString('base64');
    await page.close();
    await browser.close();
    return base64;
  }
}
