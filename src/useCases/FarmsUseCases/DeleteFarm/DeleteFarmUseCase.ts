import { IFarmRepository } from "../../../repositories/IFarmRepository"

export class DeleteFarmUseCase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(id: string): Promise<void> {
    await this.farmRepository.delete(id)
  }
}
