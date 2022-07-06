"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bookmark_1 = require("./bookmark");
describe('Unit Test Bookmark', () => {
    test('should create with https://www.my-host.org:8080', async () => {
        const bookmark = new bookmark_1.Bookmark('id', 'https://www.my-host.org:8080', 'name', 'icon', 'preview');
        expect(bookmark.id).toEqual('id');
        expect(bookmark.url).toEqual('https://www.my-host.org:8080');
        expect(bookmark.hostname).toEqual('www.my-host.org');
        expect(bookmark.name).toEqual('name');
        expect(bookmark.iconBase64).toEqual('icon');
        expect(bookmark.previewBase64).toEqual('preview');
    });
    test('should create with https://www.my-host.org', async () => {
        const bookmark = new bookmark_1.Bookmark('id', 'https://www.my-host.org', 'name', 'icon', 'preview');
        expect(bookmark.id).toEqual('id');
        expect(bookmark.url).toEqual('https://www.my-host.org');
        expect(bookmark.hostname).toEqual('www.my-host.org');
        expect(bookmark.name).toEqual('name');
        expect(bookmark.iconBase64).toEqual('icon');
        expect(bookmark.previewBase64).toEqual('preview');
    });
    test('should create with https://my-host.org', async () => {
        const bookmark = new bookmark_1.Bookmark('id', 'https://my-host.org', 'name', 'icon', 'preview');
        expect(bookmark.id).toEqual('id');
        expect(bookmark.url).toEqual('https://my-host.org');
        expect(bookmark.hostname).toEqual('my-host.org');
        expect(bookmark.name).toEqual('name');
        expect(bookmark.iconBase64).toEqual('icon');
        expect(bookmark.previewBase64).toEqual('preview');
    });
    test('should create with empty name', async () => {
        const bookmark = new bookmark_1.Bookmark('3c921a2e-c093-457a-9634-0ad11f298990', 'https://www.youtube.com', '', 'icon', 'preview');
        expect(bookmark.id).toEqual('3c921a2e-c093-457a-9634-0ad11f298990');
        expect(bookmark.url).toEqual('https://www.youtube.com');
        expect(bookmark.hostname).toEqual('www.youtube.com');
        expect(bookmark.name).toEqual('www.youtube.com');
        expect(bookmark.iconBase64).toEqual('icon');
        expect(bookmark.previewBase64).toEqual('preview');
    });
    test('should get state', async () => {
        const bookmark = new bookmark_1.Bookmark('id', 'https://www.my-host.org:8080', 'name', 'icon', 'preview');
        const state = bookmark.getState();
        expect(state).toEqual({
            id: 'id',
            url: 'https://www.my-host.org:8080',
            hostname: 'www.my-host.org',
            name: 'name',
            iconBase64: 'icon',
            previewBase64: 'preview',
        });
    });
    test('should create from state', async () => {
        const state = {
            id: 'id',
            url: 'https://www.my-host.org:8080',
            hostname: 'www.my-host.org',
            name: 'name',
            iconBase64: 'icon',
            previewBase64: 'preview',
        };
        const bookmark = new bookmark_1.Bookmark(state);
        expect(bookmark.id).toEqual('id');
        expect(bookmark.url).toEqual('https://www.my-host.org:8080');
        expect(bookmark.hostname).toEqual('www.my-host.org');
        expect(bookmark.name).toEqual('name');
        expect(bookmark.iconBase64).toEqual('icon');
        expect(bookmark.previewBase64).toEqual('preview');
    });
});
