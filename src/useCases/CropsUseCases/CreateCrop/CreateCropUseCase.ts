import { ICropDTO } from "../ICropDTO"
import { CropEntity } from "../../../entities/CropEntity"
import { ICropRepository } from "../../../repositories/ICropRepository"

export class CreateCropUseCase {
  constructor(private cropRepository: ICropRepository) {}

  async execute(cropDTO: ICropDTO): Promise<CropEntity> {
    const newCrop = new CropEntity(cropDTO)

    return await this.cropRepository.insert(newCrop)
  }
}
