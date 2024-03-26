import { Request, Response } from "express"
import { DashboardFarmerUseCase } from "./DashboardFarmerUseCase"

export class DashboardFarmerController {
  constructor(private dashboardFarmerUseCase: DashboardFarmerUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { farmer_id } = request.params

      const dashboardResults = await this.dashboardFarmerUseCase.execute(
        farmer_id
      )
      return response.status(201).send(dashboardResults)
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
