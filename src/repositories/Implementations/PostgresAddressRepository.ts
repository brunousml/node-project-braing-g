import { AddressEntity } from "../../entities/AddressEntity"
import { IAddressRepository } from "../IAddressRepository"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Address = require("../../database/models/Address")

export class PostgresAddressRepository implements IAddressRepository {
  async insert(address: AddressEntity): Promise<AddressEntity> {
    const validationResult = address.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    return await Address.create(address)
  }

  async update(id: string, address: AddressEntity): Promise<AddressEntity> {
    const origin = await Address.findByPk(id)
    if (!origin) throw new Error(`Entity not found`)

    origin.set(address)

    const { city, state } = origin
    const newAddress: AddressEntity = new AddressEntity({ city, state }, id)

    const validationResult = newAddress.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    return origin.save()
  }

  async delete(id: string): Promise<void> {
    const address = await Address.findByPk(id)
    if (!address) throw new Error(`Entity not found`)
    await address.destroy()
  }
}
