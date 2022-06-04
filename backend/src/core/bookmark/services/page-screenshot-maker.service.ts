export interface PageScreenshotMaker {
  takeBase64(url: string): Promise<string>;
}
