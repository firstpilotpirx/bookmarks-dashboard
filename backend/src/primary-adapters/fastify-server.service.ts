import fastify from 'fastify';
import generated from '@fastify/cors';
import { DashboardJsonRepository } from '../secondary-adapters/json/dashboard.json.repository';
import { SetNewBookmarkUseCase } from '../core/bookmark/use-cases/set-new-bookmark.use-case';
import { Base64ResizerSharpService } from '../secondary-adapters/sharp/base64-resizer.sharp.service';
import { ReadDashboardUseCase } from '../core/bookmark/use-cases/read-dashboard.use-case';
import { PagePreviewMakerPlaywrightService } from '../secondary-adapters/playwright/page-preview-maker.playwright.service';
import { PageIconMakerGoogleS2FaviconAxiosService } from '../secondary-adapters/axios/page-icon-maker-google-s2-favicon.axios.service';
import { BookmarkFactoryService } from '../core/bookmark/services/bookmark-factory.service';
import { UuidUuidjsService } from '../secondary-adapters/uuidjs/uuid.uuidjs.service';
import { DeleteOneBookmarkUseCase } from '../core/bookmark/use-cases/delete-one-bookmark.use-case';
import { GridPosition } from '@bookmarks-dashboard/domain/dist/bookmark/entities/grid-position';
import { CreateNewGridUseCase } from '../core/bookmark/use-cases/create-new-grid.use-case';
import { DeleteOneGridUseCase } from '../core/bookmark/use-cases/delete-one-grid.use-case';

export class ServerParam {
  constructor(public readonly host: string, public readonly port: number) {}
}
export class FastifyServerService {
  private readonly server = fastify({ logger: true });

  private bookmarkRepository = new DashboardJsonRepository();

  private uuidService = new UuidUuidjsService();
  private pageIconMakerService = new PageIconMakerGoogleS2FaviconAxiosService();
  private pagePreviewMaker = new PagePreviewMakerPlaywrightService(1600, 800);
  private base64Resizer = new Base64ResizerSharpService();
  private bookmarkFactoryService = new BookmarkFactoryService(
    this.uuidService,
    this.pageIconMakerService,
    this.pagePreviewMaker,
    this.base64Resizer,
  );

  private setNewBookmarkUseCase = new SetNewBookmarkUseCase(this.bookmarkFactoryService, this.bookmarkRepository);
  private readDashboardUseCase = new ReadDashboardUseCase(this.bookmarkRepository);
  private deleteOneBookmarkUseCase = new DeleteOneBookmarkUseCase(this.bookmarkRepository);
  private createNewGridUseCase = new CreateNewGridUseCase(this.bookmarkRepository);
  private deleteOneGridUseCase = new DeleteOneGridUseCase(this.bookmarkRepository);

  constructor(private port: number = 3334) {
    this.server.register(generated, { origin: true });

    this.readDashboard();

    this.createNewGrid();
    this.deleteOneGrid();

    this.setNewBookmark();
    this.deleteBookmark();
  }

  private readDashboard(): void {
    this.server.get('/dashboard', async (_request, _reply) => {
      const dashboard = await this.readDashboardUseCase.execute();
      return dashboard.getState();
    });
  }

  private createNewGrid(): void {
    this.server.post('/dashboard/grid', async (_request, _reply) => {
      await this.createNewGridUseCase.execute();
      return { result: 'ok' };
    });
  }

  private deleteOneGrid(): void {
    this.server.delete('/dashboard/grid/:gridIndex', async (request, _reply) => {
      const params = request.params as { gridIndex: number };
      await this.deleteOneGridUseCase.execute(Number(params.gridIndex));
      return { result: 'ok' };
    });
  }

  private setNewBookmark(): void {
    this.server.put('/dashboard/grid/:gridIndex/row/:row/column/:column', async (request, _reply) => {
      const params = request.params as { gridIndex: number; row: number; column: number };
      const body = request.body as { url: string; name: string };
      await this.setNewBookmarkUseCase.execute(params.gridIndex, new GridPosition(params.row, params.column), body.url, body.name);
      return { result: 'ok' };
    });
  }

  private deleteBookmark(): void {
    this.server.delete('/dashboard/grid/:gridIndex/row/:row/column/:column', async (request, _reply) => {
      const params = request.params as { gridIndex: number; row: number; column: number };
      await this.deleteOneBookmarkUseCase.execute(params.gridIndex, new GridPosition(params.row, params.column));
      return { result: 'ok' };
    });
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
