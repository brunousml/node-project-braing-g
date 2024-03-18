import { Request, Response } from "express"
import { UpdateAddressUseCase } from "./UpdateAddressUseCase"

export class UpdateAddressController {
  constructor(private updateAddressUseCase: UpdateAddressUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { address_id } = request.params
      const address = await this.updateAddressUseCase.execute(
        address_id,
        request.body,
      )
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
