import { PostgresFarmerRepository } from "./PostgresFarmerRepository"
import { PostgresAddressRepository } from "./PostgresAddressRepository"
import { PostgresFarmRepository } from "./PostgresFarmRepository"
import { PostgresCropRepository } from "./PostgresCropRepository"

const postgresFarmerRepository: PostgresFarmerRepository =
  new PostgresFarmerRepository()
const postgresAddressRepository: PostgresAddressRepository =
  new PostgresAddressRepository()
const postgresFarmRepository: PostgresFarmRepository =
  new PostgresFarmRepository()

const postgresCropRepository: PostgresCropRepository =
  new PostgresCropRepository()

export {
  postgresFarmerRepository,
  postgresAddressRepository,
  postgresFarmRepository,
  postgresCropRepository
}
