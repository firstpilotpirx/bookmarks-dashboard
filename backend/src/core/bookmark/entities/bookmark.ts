export class Bookmark {
  public hostname: string;

  constructor(public id: string, public url: string, public name: string, public iconBase64: string, public previewBase64: string) {
    const domain = new URL(url);
    this.hostname = domain.hostname;

    if (name === '') {
      this.name = this.hostname;
    }
  }
}
