import { IAddressRepository } from "../../../repositories/IAddressRepository"

export class DeleteAddressUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  async execute(id: string): Promise<void> {
    await this.addressRepository.delete(id)
  }
}
