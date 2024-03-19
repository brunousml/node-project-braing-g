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

  async update(id: string, farmer: FarmerEntity): Promise<FarmerEntity> {
    const origin = await Farmer.findByPk(id)
    if (!origin) throw new Error(`Entity not found`)

    origin.set(farmer)

    const { cpf, cnpj, name } = origin
    const newFarmer = new FarmerEntity({ cpf, cnpj, name }, id)

    const validationResult = newFarmer.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    return origin.save()
  }

  async delete(id: string): Promise<void> {
    const farmer = await Farmer.findByPk(id)
    if (!farmer) throw new Error(`Entity not found`)
    await farmer.destroy()
  }
}
