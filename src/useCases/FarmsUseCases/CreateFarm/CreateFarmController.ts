import { Request, Response } from "express"
import { CreateFarmUseCase } from "./CreateFarmUseCase"
import { FarmEntity } from "../../../entities/FarmEntity"

export class CreateFarmController {
  constructor(private createFarmUseCase: CreateFarmUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const farm: FarmEntity = await this.createFarmUseCase.execute(
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
