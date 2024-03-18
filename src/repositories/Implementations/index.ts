import { PostgresFarmerRepository } from "./PostgresFarmerRepository"
import { PostgresAddressRepository } from "./PostgresAddressRepository"
import { PostgresFarmRepository } from "./PostgresFarmRepository"

const postgresFarmerRepository: PostgresFarmerRepository =
  new PostgresFarmerRepository()
const postgresAddressRepository: PostgresAddressRepository =
  new PostgresAddressRepository()
const postgresFarmRepository: PostgresFarmRepository =
  new PostgresFarmRepository()

export {
  postgresFarmerRepository,
  postgresAddressRepository,
  postgresFarmRepository,
}
