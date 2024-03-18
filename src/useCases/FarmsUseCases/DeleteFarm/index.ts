import { DeleteFarmUseCase } from "./DeleteFarmUseCase"
import { DeleteFarmController } from "./DeleteFarmController"
import { postgresFarmRepository } from "../../../repositories/Implementations"

const deleteFarmUseCase: DeleteFarmUseCase = new DeleteFarmUseCase(
  postgresFarmRepository,
)
const deleteFarmController: DeleteFarmController = new DeleteFarmController(
  deleteFarmUseCase,
)

export { deleteFarmController }
