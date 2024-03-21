import { Request, Response } from "express"
import { UpdateCropUseCase } from "./UpdateCropUseCase"

export class UpdateCropController {
  constructor(private updateCropUseCase: UpdateCropUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { crop_id } = request.params
      const crop = await this.updateCropUseCase.execute(
        crop_id,
        request.body,
      )
      return response.status(201).send(crop)
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
