import { DashboardRepository } from '../repositories/dashboardRepository';

export class CreateNewGridUseCase {
  constructor(private readonly bookmarkRepository: DashboardRepository) {}

  async execute(): Promise<void> {
    const dashboard = await this.bookmarkRepository.read();
    dashboard.createGrid();
    await this.bookmarkRepository.save(dashboard);
  }
}
