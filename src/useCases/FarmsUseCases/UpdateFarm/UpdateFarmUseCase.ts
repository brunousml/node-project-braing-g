import { IFarmDTO } from "../IFarmDTO"
import { IFarmRepository } from "../../../repositories/IFarmRepository"
import { FarmEntity } from "../../../entities/FarmEntity"

export class UpdateFarmUseCase {
  constructor(private farmRepository: IFarmRepository) {}

  async execute(id: string, farmDto: IFarmDTO): Promise<FarmEntity> {
    const newFarm: FarmEntity = new FarmEntity(farmDto, id)

    return await this.farmRepository.update(id, newFarm)
  }
}
