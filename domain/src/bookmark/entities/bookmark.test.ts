import { Bookmark } from './bookmark';
import { BookmarkState } from './bookmark-state';

describe('Unit Test Bookmark', () => {
  test('should create with https://www.my-host.org:8080', async () => {
    const bookmark = new Bookmark('id', 'https://www.my-host.org:8080', 'name', 'icon', 'preview');

    expect(bookmark.id).toEqual('id');
    expect(bookmark.url).toEqual('https://www.my-host.org:8080');
    expect(bookmark.hostname).toEqual('www.my-host.org');
    expect(bookmark.name).toEqual('name');
    expect(bookmark.iconBase64).toEqual('icon');
    expect(bookmark.previewBase64).toEqual('preview');
  });

  test('should create with https://www.my-host.org', async () => {
    const bookmark = new Bookmark('id', 'https://www.my-host.org', 'name', 'icon', 'preview');

    expect(bookmark.id).toEqual('id');
    expect(bookmark.url).toEqual('https://www.my-host.org');
    expect(bookmark.hostname).toEqual('www.my-host.org');
    expect(bookmark.name).toEqual('name');
    expect(bookmark.iconBase64).toEqual('icon');
    expect(bookmark.previewBase64).toEqual('preview');
  });

  test('should create with https://my-host.org', async () => {
    const bookmark = new Bookmark('id', 'https://my-host.org', 'name', 'icon', 'preview');

    expect(bookmark.id).toEqual('id');
    expect(bookmark.url).toEqual('https://my-host.org');
    expect(bookmark.hostname).toEqual('my-host.org');
    expect(bookmark.name).toEqual('name');
    expect(bookmark.iconBase64).toEqual('icon');
    expect(bookmark.previewBase64).toEqual('preview');
  });

  test('should get state', async () => {
    const bookmark = new Bookmark('id', 'https://www.my-host.org:8080', 'name', 'icon', 'preview');
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
    const state: BookmarkState = {
      id: 'id',
      url: 'https://www.my-host.org:8080',
      hostname: 'www.my-host.org',
      name: 'name',
      iconBase64: 'icon',
      previewBase64: 'preview',
    };

    const bookmark = new Bookmark(state);

    expect(bookmark.id).toEqual('id');
    expect(bookmark.url).toEqual('https://www.my-host.org:8080');
    expect(bookmark.hostname).toEqual('www.my-host.org');
    expect(bookmark.name).toEqual('name');
    expect(bookmark.iconBase64).toEqual('icon');
    expect(bookmark.previewBase64).toEqual('preview');
  });
});
