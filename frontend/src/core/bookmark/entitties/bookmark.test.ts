import { Bookmark } from './bookmark';

describe('Unit Test', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  test('test case', async () => {
    const bookmark = new Bookmark('id', 'url', 'name', 'icon', 'preview');

    expect(bookmark.id).toEqual('id');
    expect(bookmark.url).toEqual('url');
    expect(bookmark.name).toEqual('name');
    expect(bookmark.iconBase64).toEqual('icon');
    expect(bookmark.previewBase64).toEqual('preview');
  });
});
