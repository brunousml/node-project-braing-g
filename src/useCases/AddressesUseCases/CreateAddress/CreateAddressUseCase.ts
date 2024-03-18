import { IAddressDTO } from "../IAddressDTO"
import { AddressEntity } from "../../../entities/AddressEntity"
import { IAddressRepository } from "../../../repositories/IAddressRepository"

export class CreateAddressUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(addressDto: IAddressDTO): Promise<AddressEntity> {
    const newAddress = new AddressEntity(addressDto)

    return await this.addressRepository.insert(newAddress)
  }
}
