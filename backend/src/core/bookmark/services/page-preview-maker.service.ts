export interface PagePreviewMaker {
  makeBase64(url: string): Promise<string>;
}
