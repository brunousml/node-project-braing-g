import { DeleteFarmerUseCase } from "./DeleteFarmerUseCase"
import { DeleteFarmerController } from "./DeleteFarmerController"
import { postgresFarmerRepository } from "../../../repositories/Implementations"

const deleteFarmerUseCase: DeleteFarmerUseCase = new DeleteFarmerUseCase(
  postgresFarmerRepository,
)
const deleteFarmerController: DeleteFarmerController =
  new DeleteFarmerController(deleteFarmerUseCase)

export { deleteFarmerController }
