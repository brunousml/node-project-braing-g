import { UpdateCropUseCase } from "./UpdateCropUseCase"
import { UpdateCropController } from "./UpdateCropController"
import { postgresCropRepository } from "../../../repositories/Implementations"

const updateCropUseCase: UpdateCropUseCase = new UpdateCropUseCase(
  postgresCropRepository,
)
const updateCropController: UpdateCropController =
  new UpdateCropController(updateCropUseCase)

export { updateCropController }
