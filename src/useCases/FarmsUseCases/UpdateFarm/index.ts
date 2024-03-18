import { UpdateFarmUseCase } from "./UpdateFarmUseCase"
import { UpdateFarmController } from "./UpdateFarmController"
import { postgresFarmRepository } from "../../../repositories/Implementations"

const updateFarmUseCase: UpdateFarmUseCase = new UpdateFarmUseCase(
  postgresFarmRepository,
)
const updateFarmController: UpdateFarmController = new UpdateFarmController(
  updateFarmUseCase,
)

export { updateFarmController }
