import { ICropRepository } from "../ICropRepository"
import { CropEntity } from "../../entities/CropEntity"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Crop = require("../../models/Crop")

export class PostgresCropRepository implements ICropRepository {
  async insert(cropEntity: CropEntity): Promise<CropEntity> {
    const validationResult = cropEntity.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    const {id, name} = await Crop.create(cropEntity)
    return new CropEntity({name}, id)
  }

  async update(id: string, cropEntity: CropEntity): Promise<CropEntity> {
    // Validate that address already exists
    const origin = await Crop.findByPk(id)
    if (!origin) throw new Error(`Entity not found`)

    // Set new values from request
    origin.set(cropEntity)
    const { name } = origin
    const newCrop: CropEntity = new CropEntity({ name }, id)

    // Validate it before save
    const validationResult = cropEntity.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    await origin.save()
    return newCrop
  }

  async delete(id: string): Promise<void> {
    const crop = await Crop.findByPk(id)
    if (!crop) throw new Error(`Entity not found`)
    await crop.destroy()
  }
}
