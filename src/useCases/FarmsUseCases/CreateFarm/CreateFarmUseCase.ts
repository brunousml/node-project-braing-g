import { IFarmDTO } from "../IFarmDTO"
import { IFarmRepository } from "../../../repositories/IFarmRepository"
import { FarmEntity } from "../../../entities/FarmEntity"

export class CreateFarmUseCase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(farmDto: IFarmDTO): Promise<FarmEntity> {
    const newFarm:FarmEntity = new FarmEntity(farmDto)

    return await this.farmRepository.insert(newFarm)
  }
}
