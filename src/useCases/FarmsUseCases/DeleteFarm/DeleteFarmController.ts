import { Request, Response } from "express"
import { DeleteFarmUseCase } from "./DeleteFarmUseCase"

export class DeleteFarmController {
  constructor(private deleteFarmUseCase: DeleteFarmUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { farm_id } = request.params
      await this.deleteFarmUseCase.execute(farm_id)
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
