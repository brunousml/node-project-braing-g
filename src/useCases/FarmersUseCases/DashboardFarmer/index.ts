import { DashboardFarmerUseCase } from "./DashboardFarmerUseCase"
import { DashboardFarmerController } from "./DashboardFarmerController"
import { postgresFarmerRepository } from "../../../repositories/Implementations"

const dashboardFarmerUseCase: DashboardFarmerUseCase = new DashboardFarmerUseCase(
  postgresFarmerRepository,
)
const dashboardFarmerController: DashboardFarmerController =
  new DashboardFarmerController(dashboardFarmerUseCase)

export { dashboardFarmerController }
