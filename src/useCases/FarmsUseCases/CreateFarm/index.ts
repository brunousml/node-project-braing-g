import { CreateFarmUseCase } from "./CreateFarmUseCase"
import { CreateFarmController } from "./CreateFarmController"
import { postgresFarmRepository } from "../../../repositories/Implementations"

const createFarmUseCase: CreateFarmUseCase = new CreateFarmUseCase(
  postgresFarmRepository,
)
const createFarmController: CreateFarmController = new CreateFarmController(
  createFarmUseCase,
)

export { createFarmController }
