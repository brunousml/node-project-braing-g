import { ICropRepository } from "../../../repositories/ICropRepository"

export class DeleteCropUseCase {
  constructor(private cropRepository: ICropRepository) {}

  async execute(id: string): Promise<void> {
    await this.cropRepository.delete(id)
  }
}
