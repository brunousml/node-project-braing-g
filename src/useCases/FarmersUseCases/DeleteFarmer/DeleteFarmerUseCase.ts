import { IFarmerRepository } from "../../../repositories/IFarmerRepository"

export class DeleteFarmerUseCase {
  constructor(private farmerRepository: IFarmerRepository) {}

  async execute(id: string): Promise<void> {
    await this.farmerRepository.delete(id)
  }
}
