import { UpdateFarmerUseCase } from "./UpdateFarmerUseCase"
import { UpdateFarmerController } from "./UpdateFarmerController"
import { postgresFarmerRepository } from "../../../repositories/Implementations"

const updateFarmerUseCase: UpdateFarmerUseCase = new UpdateFarmerUseCase(
  postgresFarmerRepository,
)
const updateFarmerController: UpdateFarmerController =
  new UpdateFarmerController(updateFarmerUseCase)

export { updateFarmerController }
