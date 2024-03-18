import { IFarmerRepository } from "../../../repositories/IFarmerRepository"
import { FarmerEntity } from "../../../entities/FarmerEntity"
import { IFarmerDTO } from "../IFarmerDTO"

export class UpdateFarmerUseCase {
  constructor(private farmerRepository: IFarmerRepository) {}

  async execute(id: string, farmerDto: IFarmerDTO): Promise<FarmerEntity> {
    const newFarmer: FarmerEntity = new FarmerEntity(farmerDto, id)

    return await this.farmerRepository.update(id, newFarmer)
  }
}
