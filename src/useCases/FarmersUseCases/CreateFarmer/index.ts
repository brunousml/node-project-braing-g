import { CreateFarmerUseCase } from "./CreateFarmerUseCase"
import { CreateFarmerController } from "./CreateFarmerController"
import { postgresFarmerRepository } from "../../../repositories/Implementations"

const createFarmerUseCase: CreateFarmerUseCase = new CreateFarmerUseCase(
  postgresFarmerRepository,
)
const createFarmerController: CreateFarmerController =
  new CreateFarmerController(createFarmerUseCase)

export { createFarmerController }
