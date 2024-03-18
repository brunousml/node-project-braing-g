import { Request, Response } from "express"
import { UpdateFarmerUseCase } from "./UpdateFarmerUseCase"

export class UpdateFarmerController {
  constructor(private updateFarmerUseCase: UpdateFarmerUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { farmer_id } = request.params
      const farmer = await this.updateFarmerUseCase.execute(
        farmer_id,
        request.body,
      )
      return response.status(201).send(farmer)
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
