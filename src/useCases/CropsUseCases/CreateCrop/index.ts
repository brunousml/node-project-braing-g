import { CreateCropUseCase } from "./CreateCropUseCase"
import { CreateCropController } from "./CreateCropController"
import { postgresCropRepository } from "../../../repositories/Implementations"

const createCropUseCase: CreateCropUseCase = new CreateCropUseCase(
  postgresCropRepository,
)
const createCropController: CreateCropController =
  new CreateCropController(createCropUseCase)

export { createCropController }
