import { DashboardRepository } from '../repositories/dashboardRepository';

export class ChangeGridNameUseCase {
  constructor(private readonly bookmarkRepository: DashboardRepository) {}

  async execute(gridIndex: number, newName: string): Promise<void> {
    const dashboard = await this.bookmarkRepository.read();
    dashboard.getGrid(gridIndex).name = newName;
    await this.bookmarkRepository.save(dashboard);
  }
}
