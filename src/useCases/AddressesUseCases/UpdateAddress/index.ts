import { UpdateAddressUseCase } from "./UpdateAddressUseCase"
import { UpdateAddressController } from "./UpdateAddressController"
import { postgresAddressRepository } from "../../../repositories/Implementations"

const updateAddressUseCase: UpdateAddressUseCase = new UpdateAddressUseCase(
  postgresAddressRepository,
)
const updateAddressController: UpdateAddressController =
  new UpdateAddressController(updateAddressUseCase)

export { updateAddressController }
