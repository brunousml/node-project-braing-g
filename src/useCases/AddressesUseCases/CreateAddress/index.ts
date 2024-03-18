import { CreateAddressUseCase } from "./CreateAddressUseCase"
import { CreateAddressController } from "./CreateAddressController"
import { postgresAddressRepository } from "../../../repositories/Implementations"

const createAddressUseCase: CreateAddressUseCase = new CreateAddressUseCase(
  postgresAddressRepository,
)
const createAddressController: CreateAddressController =
  new CreateAddressController(createAddressUseCase)

export { createAddressController }
