import { IFarmerRepository } from "../../../repositories/IFarmerRepository"

export class DashboardFarmerUseCase {
  constructor(private farmerRepository: IFarmerRepository) {}

  async execute(id: string): Promise<object> {
    return await this.farmerRepository.dashboard(id)
  }
}
