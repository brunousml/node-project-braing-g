import { Request, Response } from "express"
import { DeleteCropUseCase } from "./DeleteCropUseCase"

export class DeleteCropController {
  constructor(private deleteCropUseCase: DeleteCropUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { crop_id } = request.params
      await this.deleteCropUseCase.execute(crop_id)
      return response.status(204).send()
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorResponse = {
          success: false,
          message: error.message || "An unexpected error occurred",
        }
        return response.status(400).send(errorResponse)
      } else {
        return response.status(500).send(error)
      }
    }
  }
}
