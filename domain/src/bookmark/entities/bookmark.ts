import { BookmarkState } from './bookmark-state';

export class Bookmark {
  private readonly state!: BookmarkState;

  constructor(id: string | BookmarkState, url?: string, name?: string, iconBase64?: string, previewBase64?: string) {
    if (url === undefined || name === undefined || iconBase64 === undefined || previewBase64 === undefined) {
      this.state = id as BookmarkState;
      return;
    }

    const hostname = new URL(url).hostname;

    if (name === '') {
      name = this.hostname;
    }

    this.state = {
      id: id as string,
      url,
      hostname,
      name,
      iconBase64,
      previewBase64,
    };
  }

  get id(): string {
    return this.state.id;
  }
  get url(): string {
    return this.state.url;
  }
  get hostname(): string {
    return this.state.hostname;
  }

  get name(): string {
    return this.state.name;
  }

  get iconBase64(): string {
    return this.state.iconBase64;
  }
  get previewBase64(): string {
    return this.state.previewBase64;
  }

  getState(): BookmarkState {
    return this.state;
  }
}
