"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookmark = void 0;
class Bookmark {
    id;
    url;
    name;
    iconBase64;
    previewBase64;
    hostname;
    constructor(id, url, name, iconBase64, previewBase64) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.iconBase64 = iconBase64;
        this.previewBase64 = previewBase64;
        const domain = new URL(url);
        this.hostname = domain.hostname;
        if (name === '') {
            this.name = this.hostname;
        }
    }
}
exports.Bookmark = Bookmark;
