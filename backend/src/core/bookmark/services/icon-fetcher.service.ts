export interface IconFetcherService {
  fetch(url: string): Promise<string>;
}
