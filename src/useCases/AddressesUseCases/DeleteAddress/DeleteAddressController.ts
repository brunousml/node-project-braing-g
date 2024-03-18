import { Request, Response } from "express"
import { DeleteAddressUseCase } from "./DeleteAddressUseCase"

export class DeleteAddressController {
  constructor(private deleteAddressUseCase: DeleteAddressUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { address_id } = request.params
      await this.deleteAddressUseCase.execute(address_id)
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
