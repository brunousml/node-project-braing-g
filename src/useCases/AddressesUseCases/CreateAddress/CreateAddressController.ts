import { Request, Response } from "express"
import { CreateAddressUseCase } from "./CreateAddressUseCase"

export class CreateAddressController {
  constructor(private createAddressUseCase: CreateAddressUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const address = await this.createAddressUseCase.execute(request.body)
      return response.status(201).send(address)
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
