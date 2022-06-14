import { DashboardRepository } from '../repositories/dashboard.repository';

export class CreateGridUseCase {
  constructor(private readonly bookmarkRepository: DashboardRepository) {}

  async execute(): Promise<void> {
    return this.bookmarkRepository.createGrid();
  }
}
