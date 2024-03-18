import { IFarmerRepository } from "../../../repositories/IFarmerRepository"
import { IFarmerDTO } from "../IFarmerDTO"
import { FarmerEntity } from "../../../entities/FarmerEntity"

export class CreateFarmerUseCase {
  constructor(private farmerRepository: IFarmerRepository) {}

  async execute(farmerDto: IFarmerDTO): Promise<FarmerEntity> {
    const newFarmer: FarmerEntity = new FarmerEntity(farmerDto)

    return await this.farmerRepository.insert(newFarmer)
  }
}
