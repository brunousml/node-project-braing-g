import { IFarmRepository } from "../IFarmRepository"
import { FarmEntity } from "../../entities/FarmEntity"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farm = require("../../models/Farm")

export class PostgresFarmRepository implements IFarmRepository {
  async insert(farmEntity: FarmEntity): Promise<FarmEntity> {
    const validationResult = farmEntity.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    return await Farm.create(farmEntity)
  }

  async update(id: string, farmEntity: FarmEntity): Promise<FarmEntity> {
    // Validate that address already exists
    const origin = await Farm.findByPk(id)
    if (!origin) throw new Error(`Entity not found`)

    // Set new values from request
    origin.set(farmEntity)
    const { name, totalArea, arableArea, vegetationArea, farmer_id, address_id } = origin
    const newFarm: FarmEntity = new FarmEntity(
      { name, totalArea, arableArea, vegetationArea, farmer_id, address_id},
      id,
    )

    // Validate it before save
    const validationResult = farmEntity.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    await origin.save()
    return newFarm
  }

  async delete(id: string): Promise<void> {
    const farm = await Farm.findByPk(id)
    if (!farm) throw new Error(`Entity not found`)
    await farm.destroy()
  }
}
