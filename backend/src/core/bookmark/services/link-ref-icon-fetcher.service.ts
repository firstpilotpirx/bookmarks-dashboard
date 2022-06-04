export interface LinkRefIconFetcherService {
  fetch(url: string): Promise<string>;
}
