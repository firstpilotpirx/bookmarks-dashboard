import fastify from 'fastify';
import generated from '@fastify/cors';
import { BookmarkSqliteRepository } from '../secondary-adapters/sqlite/bookmark.sqlite.repository';
import { CreateNewBookmarkUseCase } from '../core/bookmark/use-cases/create-new-bookmark.use-case';
import { Base64ResizerSharpService } from '../secondary-adapters/sharp/base64-resizer.sharp.service';
import { ReadAllBookmarksUseCase } from '../core/bookmark/use-cases/read-all-bookmarks.use-case';
import { PageScreenshotMakerPlaywrightService } from '../secondary-adapters/playwright/page-screenshot-maker.playwright.service';
import { IconFetcherGoogleS2FaviconAxiosService } from '../secondary-adapters/axios/icon-fetcher-google-s2-favicon.axios.service';

export class ServerParam {
  constructor(public readonly host: string, public readonly port: number) {}
}
export class FastifyServerService {
  private readonly server = fastify({ logger: true });

  constructor(private port: number = 3334) {
    this.server.register(generated, { origin: true });

    const pageScreenshotMaker = new PageScreenshotMakerPlaywrightService(Math.floor(1600 / 1.2), Math.floor(900 / 1.2));
    // const pageScreenshotMaker = new PageScreenshotMakerSeleniumService();
    const bookmarkRepository = new BookmarkSqliteRepository();
    const base64Resizer = new Base64ResizerSharpService();
    // const iconFetcher = new IconFetcherFaviconAxiosService();
    const iconFetcher = new IconFetcherGoogleS2FaviconAxiosService();
    const createBookmarkUseCase = new CreateNewBookmarkUseCase(bookmarkRepository, pageScreenshotMaker, base64Resizer, iconFetcher);
    const readAllBookmarksUseCase = new ReadAllBookmarksUseCase(bookmarkRepository);

    this.server.post('/bookmark', async (request, _reply) => {
      const url = (request.body as { url: string }).url;
      const name = (request.body as { name: string }).name;
      await createBookmarkUseCase.execute(url, name);
      return { result: 'ok' };
    });

    this.server.get('/bookmark', async (_request, _reply) => {
      return readAllBookmarksUseCase.execute();
    });

    /*
    curl -X POST http://localhost:3334/bookmark -H 'Content-Type: application/json' -d '{"url":"https://www.youtube.com","name":"my name"}'
*/
    // this.server.post('/screenshot/base64', async (request, _reply) => {
    //   const screenshotMaker = new PageScreenshotMakerPlaywrightService();
    //   const screenshot = await screenshotMaker.takeBase64((request.body as { url: string }).url);
    //   return { base64: screenshot };
    // });
  }

  async start(): Promise<ServerParam> {
    try {
      await this.server.listen(this.port);
      return new ServerParam('http://localhost', this.port);
    } catch (err) {
      this.server.log.error(err);
      process.exit(1);
    }
  }
}
