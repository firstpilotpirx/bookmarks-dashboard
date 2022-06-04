export interface PageIconMakerService {
  makeBase64(url: string): Promise<string>;
}
