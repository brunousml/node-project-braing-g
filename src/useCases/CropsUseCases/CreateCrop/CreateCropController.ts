import { Request, Response } from "express"
import { CreateCropUseCase } from "./CreateCropUseCase"

export class CreateCropController {
  constructor(private createCropUseCase: CreateCropUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const crop = await this.createCropUseCase.execute(request.body)
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
