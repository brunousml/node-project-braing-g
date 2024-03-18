import { Request, Response } from "express"
import { UpdateFarmUseCase } from "./UpdateFarmUseCase"
import { FarmEntity } from "../../../entities/FarmEntity"

export class UpdateFarmController {
  constructor(private updateFarmUseCase: UpdateFarmUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { farm_id } = request.params
      const farm: FarmEntity = await this.updateFarmUseCase.execute(
        farm_id,
        request.body,
      )
      return response.status(201).send(farm)
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
