import { AddressEntity } from "../../../entities/AddressEntity"
import { IAddressDTO } from "../IAddressDTO"
import { IAddressRepository } from "../../../repositories/IAddressRepository"

export class UpdateAddressUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(id: string, addressDto: IAddressDTO): Promise<AddressEntity> {
    const newAddress: AddressEntity = new AddressEntity(addressDto, id)

    return await this.addressRepository.update(id, newAddress)
  }
}
