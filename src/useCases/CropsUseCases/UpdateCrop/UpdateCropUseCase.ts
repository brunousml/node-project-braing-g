import { CropEntity } from "../../../entities/CropEntity"
import { ICropDTO } from "../ICropDTO"
import { ICropRepository } from "../../../repositories/ICropRepository"

export class UpdateCropUseCase {
  constructor(private cropRepository: ICropRepository) {}

  async execute(id: string, cropDto: ICropDTO): Promise<CropEntity> {
    const newCrop: CropEntity = new CropEntity(cropDto, id)

    return await this.cropRepository.update(id, newCrop)
  }
}
