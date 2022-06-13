import fastify from 'fastify';
import generated from '@fastify/cors';
import { BookmarkJsonRepository } from '../secondary-adapters/json/bookmark.json.repository';
import { CreateNewBookmarkUseCase } from '../core/bookmark/use-cases/create-new-bookmark.use-case';
import { Base64ResizerSharpService } from '../secondary-adapters/sharp/base64-resizer.sharp.service';
import { ReadAllBookmarksUseCase } from '../core/bookmark/use-cases/read-all-bookmarks.use-case';
import { PagePreviewMakerPlaywrightService } from '../secondary-adapters/playwright/page-preview-maker.playwright.service';
import { PageIconMakerGoogleS2FaviconAxiosService } from '../secondary-adapters/axios/page-icon-maker-google-s2-favicon.axios.service';
import { BookmarkFactoryService } from '../core/bookmark/services/bookmark-factory.service';
import { UuidUuidjsService } from '../secondary-adapters/uuidjs/uuid.uuidjs.service';
import { DeleteOneBookmarkUseCase } from '../core/bookmark/use-cases/delete-one-bookmark.use-case';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';

export class ServerParam {
  constructor(public readonly host: string, public readonly port: number) {}
}
export class FastifyServerService {
  private readonly server = fastify({ logger: true });

  constructor(private port: number = 3334) {
    this.server.register(generated, { origin: true });

    const bookmarkRepository = new BookmarkJsonRepository();

    const uuidService = new UuidUuidjsService();
    const pageIconMakerService = new PageIconMakerGoogleS2FaviconAxiosService();
    const pagePreviewMaker = new PagePreviewMakerPlaywrightService(1600, 800);
    const base64Resizer = new Base64ResizerSharpService();
    const bookmarkFactoryService = new BookmarkFactoryService(uuidService, pageIconMakerService, pagePreviewMaker, base64Resizer);

    const createBookmarkUseCase = new CreateNewBookmarkUseCase(bookmarkFactoryService, bookmarkRepository);
    const readAllBookmarksUseCase = new ReadAllBookmarksUseCase(bookmarkRepository);
    const deleteOneBookmarkUseCase = new DeleteOneBookmarkUseCase(bookmarkRepository);

    this.server.post('/bookmark', async (request, _reply) => {
      const position = (request.body as { position: GridPosition }).position;
      const url = (request.body as { url: string }).url;
      const name = (request.body as { name: string }).name;
      await createBookmarkUseCase.execute(position, url, name);
      return { result: 'ok' };
    });

    this.server.delete('/bookmark/:id', async (request, _reply) => {
      const id = (request.params as { id: string }).id;
      await deleteOneBookmarkUseCase.execute(id);

      return { result: 'ok' };
    });

    this.server.get('/bookmark', async (_request, _reply) => {
      return readAllBookmarksUseCase.execute();
    });

    /*
    curl -X POST http://localhost:3334/bookmark -H 'Content-Type: application/json' -d '{"url":"https://www.youtube.com","name":"my name"}'
*/
    // this.server.post('/screenshot/base64', async (request, _reply) => {
    //   const screenshotMaker = new PagePreviewMakerPlaywrightService();
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
