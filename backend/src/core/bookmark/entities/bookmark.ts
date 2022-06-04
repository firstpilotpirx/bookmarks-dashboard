export class Bookmark {
  public name: string;

  public url: string;

  public hostname: string;

  constructor(name: string, url: string, public previewBase64: string, public iconBase64: string) {
    this.name = name;
    this.url = url;

    const domain = new URL(url);
    this.hostname = domain.hostname;
  }
}
