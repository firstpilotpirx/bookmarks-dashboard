import { DashboardRepository } from '../repositories/dashboard.repository';

export class ChangeGridNameUseCase {
  constructor(private readonly bookmarkRepository: DashboardRepository) {}

  async execute(gridIndex: number, newName: string): Promise<void> {
    return this.bookmarkRepository.changeGridName(gridIndex, newName);
  }
}
