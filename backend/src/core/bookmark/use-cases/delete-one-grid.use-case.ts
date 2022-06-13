import { DashboardRepository } from '../repositories/dashboardRepository';

export class DeleteOneGridUseCase {
  constructor(private readonly bookmarkRepository: DashboardRepository) {}

  async execute(gridIndex: number): Promise<void> {
    const dashboard = await this.bookmarkRepository.read();
    dashboard.deleteGrid(gridIndex);
    await this.bookmarkRepository.save(dashboard);
  }
}
