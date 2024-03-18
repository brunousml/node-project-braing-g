import { Request, Response } from "express"
import { CreateFarmerUseCase } from "./CreateFarmerUseCase"
import { FarmerEntity } from "../../../entities/FarmerEntity"

export class CreateFarmerController {
  constructor(private createFarmerUseCase: CreateFarmerUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const farmer: FarmerEntity = await this.createFarmerUseCase.execute(
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
