import { PagePreviewMaker } from '../../core/bookmark/services/page-preview-maker.service';
import webdriver from 'selenium-webdriver';

export class PagePreviewMakerSeleniumService implements PagePreviewMaker {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  constructor(private readonly width = 1600, private readonly height = 900) {}
  async makeBase64(url: string): Promise<string> {
    // const safariOptions = new safari.Options();
    // safariOptions.set('user-data-dir', '/Users/pirx/Library/Safari/');
    // safariOptions.set('resolution', `${this.width}x${this.height}`);
    // safariOptions.set('os', 'OS X');
    // safariOptions.set('os_version', 'Monterey');
    // safariOptions.set('browser', 'Safari');
    // safariOptions.set('browser_version', '15.0');
    // safariOptions.set('browserstack.local', 'true');
    // safariOptions.set('browserstack.selenium_version', '3.14.0');
    // safariOptions.set('browserstack.safari.allowAllCookies', 'true');
    // var driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).setChromeOptions(safariOptions).build();

    const driver = new webdriver.Builder().forBrowser(webdriver.Browser.SAFARI).build();
    await driver.get(url);
    await driver.wait(function () {
      return driver.executeScript('return document.readyState').then(function (readyState) {
        return readyState === 'complete';
      });
    });

    await driver.manage().window().setSize(this.width, this.height);
    await driver.manage().window().maximize();

    const screenshot = await driver.takeScreenshot();
    return screenshot;
  }
}
