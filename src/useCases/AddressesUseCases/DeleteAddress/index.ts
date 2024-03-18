import { DeleteAddressUseCase } from "./DeleteAddressUseCase"
import { DeleteAddressController } from "./DeleteAddressController"
import { postgresAddressRepository } from "../../../repositories/Implementations"

const deleteAddressUseCase: DeleteAddressUseCase = new DeleteAddressUseCase(
  postgresAddressRepository,
)
const deleteAddressController: DeleteAddressController =
  new DeleteAddressController(deleteAddressUseCase)

export { deleteAddressController }
