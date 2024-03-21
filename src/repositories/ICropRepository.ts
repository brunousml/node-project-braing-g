import { CropEntity } from "../entities/CropEntity"

export interface ICropRepository {
  insert(cropEntity: CropEntity): Promise<CropEntity>
  update(id: string, cropEntity: CropEntity): Promise<CropEntity>
  delete(id: string): Promise<void>
}
