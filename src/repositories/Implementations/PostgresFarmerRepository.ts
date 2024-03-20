import { FarmerEntity } from "../../entities/FarmerEntity"
import { IFarmerRepository } from "../IFarmerRepository"

// eslint-disable-next-line
const Farmer = require('../../models/Farmer.js')

export class PostgresFarmerRepository implements IFarmerRepository {
  async insert(farmer: FarmerEntity): Promise<FarmerEntity> {
    const validationResult = farmer.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    return await Farmer.create(farmer)
  }

  async update(id: string, farmerEntity: FarmerEntity): Promise<FarmerEntity> {
    // Validate that address already exists
    const origin = await Farmer.findByPk(id)
    if (!origin) throw new Error(`Entity not found`)

    // Set new values from request
    origin.set(farmerEntity)
    const { name, cpf, cnpj } = origin
    const newFarmer: FarmerEntity = new FarmerEntity({ name, cpf, cnpj  }, id)

    // Validate it before save
    const validationResult = farmerEntity.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    await origin.save()
    return newFarmer
  }

  async delete(id: string): Promise<void> {
    const farmer = await Farmer.findByPk(id)
    if (!farmer) throw new Error(`Entity not found`)
    await farmer.destroy()
  }
}
