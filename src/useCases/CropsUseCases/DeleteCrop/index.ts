import { DeleteCropUseCase } from "./DeleteCropUseCase"
import { DeleteCropController } from "./DeleteCropController"
import { postgresCropRepository } from "../../../repositories/Implementations"

const deleteCropUseCase: DeleteCropUseCase = new DeleteCropUseCase(
  postgresCropRepository,
)
const deleteCropController: DeleteCropController =
  new DeleteCropController(deleteCropUseCase)

export { deleteCropController }
