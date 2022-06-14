import { DashboardRepository } from '../repositories/dashboard.repository';

export class DeleteGridUseCase {
  constructor(private readonly bookmarkRepository: DashboardRepository) {}

  async execute(gridIndex: number): Promise<void> {
    return this.bookmarkRepository.deleteGrid(gridIndex);
  }
}
