import { Bookmark } from './bookmark';

describe('Unit Test', () => {
  beforeAll(() => {});

  afterAll(() => {});

  beforeEach(() => {});

  afterEach(() => {});

  function shouldCheckConstructor(name: string, url: string, hostname: string): void {
    // @ts-ignore
    const bookmark = new Bookmark(name, url);

    expect(bookmark.url).toEqual(url);
    expect(bookmark.hostname).toEqual(hostname);
    expect(bookmark.name).toEqual(name);
  }

  test('test case', async () => {
    const testDataSet = [
      {
        name: 'name3',
        url: 'https://www.w3collective.com',
        hostname: 'www.w3collective.com',
      },
      {
        name: 'name5',
        url: 'https://www.w3collective.com/get-domain-name-url-javascript/',
        hostname: 'www.w3collective.com',
      },
    ];

    testDataSet.forEach((testData) => {
      shouldCheckConstructor(testData.name, testData.url, testData.hostname);
    });
  });
});
