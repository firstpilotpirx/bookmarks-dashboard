"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookmark = void 0;
class Bookmark {
    state;
    constructor(id, url, name, iconBase64, previewBase64) {
        if (url === undefined && name === undefined && iconBase64 === undefined && previewBase64 === undefined) {
            this.state = id;
            return;
        }
        if (name === undefined) {
            name = '';
        }
        if (url === undefined || iconBase64 === undefined || previewBase64 === undefined) {
            throw new Error('url, name, iconBase64, previewBase64 should not be undefined');
        }
        const hostname = new URL(url).hostname;
        if (name === '' || name === undefined || name === null) {
            name = hostname;
        }
        this.state = {
            id: id,
            url,
            hostname,
            name,
            iconBase64,
            previewBase64,
        };
    }
    get id() {
        return this.state.id;
    }
    get url() {
        return this.state.url;
    }
    get hostname() {
        return this.state.hostname;
    }
    get name() {
        return this.state.name;
    }
    get iconBase64() {
        return this.state.iconBase64;
    }
    get previewBase64() {
        return this.state.previewBase64;
    }
    getState() {
        return this.state;
    }
}
exports.Bookmark = Bookmark;
