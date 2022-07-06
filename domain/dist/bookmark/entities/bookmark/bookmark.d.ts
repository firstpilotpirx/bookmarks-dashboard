import { BookmarkState } from './bookmark-state';
export declare class Bookmark {
    private readonly state;
    constructor(id: string | BookmarkState, url?: string, name?: string, iconBase64?: string, previewBase64?: string);
    get id(): string;
    get url(): string;
    get hostname(): string;
    get name(): string;
    get iconBase64(): string;
    get previewBase64(): string;
    getState(): BookmarkState;
}
//# sourceMappingURL=bookmark.d.ts.map