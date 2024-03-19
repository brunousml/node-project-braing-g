import { IFarmRepository } from "../IFarmRepository"
import { FarmEntity } from "../../entities/FarmEntity"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farm = require("../../models/Farm")

export class PostgresFarmRepository implements IFarmRepository {
  async insert(farm: FarmEntity): Promise<FarmEntity> {
    const validationResult = farm.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    return await Farm.create(farm)
  }

  async update(id: string, farm: FarmEntity): Promise<FarmEntity> {
    const origin = await Farm.findByPk(id)
    if (!origin) throw new Error(`Entity not found`)

    origin.set(farm)

    const { name, totalArea, arableArea, vegetationArea } = origin
    const newFarm: FarmEntity = new FarmEntity(
      { name, totalArea, arableArea, vegetationArea },
      id,
    )

    const validationResult = newFarm.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    return origin.save()
  }

  async delete(id: string): Promise<void> {
    const farm = await Farm.findByPk(id)
    if (!farm) throw new Error(`Entity not found`)
    await farm.destroy()
  }
}
