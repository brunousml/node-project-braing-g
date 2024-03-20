import { AddressEntity } from "../../entities/AddressEntity"
import { IAddressRepository } from "../IAddressRepository"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Address = require("../../models/Address")

export class PostgresAddressRepository implements IAddressRepository {
  async insert(address: AddressEntity): Promise<AddressEntity> {
    const validationResult = address.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    const {id, city, state} = await Address.create(address)
    return new AddressEntity({city, state}, id)
  }

  async update(id: string, addressEntity: AddressEntity): Promise<AddressEntity> {
    // Validate that address already exists
    const origin = await Address.findByPk(id)
    if (!origin) throw new Error(`Entity not found`)

    // Set new values from request
    origin.set(addressEntity)
    const { city, state } = origin
    const newAddress: AddressEntity = new AddressEntity({ city, state }, id)

    // Validate it before save
    const validationResult = addressEntity.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    await origin.save()
    return newAddress
  }

  async delete(id: string): Promise<void> {
    const address = await Address.findByPk(id)
    if (!address) throw new Error(`Entity not found`)
    await address.destroy()
  }
}
