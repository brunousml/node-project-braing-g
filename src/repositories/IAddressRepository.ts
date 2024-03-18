import { AddressEntity } from "../entities/AddressEntity"

export interface IAddressRepository {
  insert(address: AddressEntity): Promise<AddressEntity>
  update(id: string, address: AddressEntity): Promise<AddressEntity>
  delete(id: string): Promise<void>
}
