import { Router } from "express"
import { FarmerController } from "./controllers/FarmerController"
import { createFarmerController } from "./useCases/FarmersUseCases/CreateFarmer"
import { updateFarmerController } from "./useCases/FarmersUseCases/UpdateFarmer"
import { deleteFarmerController } from "./useCases/FarmersUseCases/DeleteFarmer"
import { AddressController } from "./controllers/AddressController"
import { createAddressController } from "./useCases/AddressesUseCases/CreateAddress"
import { updateAddressController } from "./useCases/AddressesUseCases/UpdateAddress"
import { deleteAddressController } from "./useCases/AddressesUseCases/DeleteAddress"
import { FarmController } from "./controllers/FarmController"
import { deleteFarmController } from "./useCases/FarmsUseCases/DeleteFarm"
import { createFarmController } from "./useCases/FarmsUseCases/CreateFarm"
import { updateFarmController } from "./useCases/FarmsUseCases/UpdateFarm"
import { CropController } from "./controllers/CropController"
import { deleteCropController } from "./useCases/CropsUseCases/DeleteCrop"
import { createCropController } from "./useCases/CropsUseCases/CreateCrop"
import { updateCropController } from "./useCases/CropsUseCases/UpdateCrop"
import { DashboardController } from "./controllers/DashboardController"

const router = Router()

// Farmers routes
router.get("/farmers/:farmer_id/dashboard", DashboardController.list)

router.get("/farmers/", FarmerController.list)
router.post("/farmers", (request, response) => {
  return createFarmerController.handle(request, response)
})
router.patch("/farmers/:farmer_id", (request, response) => {
  return updateFarmerController.handle(request, response)
})
router.delete("/farmers/:farmer_id", (request, response) => {
  return deleteFarmerController.handle(request, response)
})

// Addresses routes
router.get("/addresses/", (request, response) => {
  return AddressController.list(request, response)
})
router.post("/addresses", (request, response) => {
  return createAddressController.handle(request, response)
})
router.patch("/addresses/:address_id", (request, response) => {
  return updateAddressController.handle(request, response)
})
router.delete("/addresses/:address_id", (request, response) => {
  return deleteAddressController.handle(request, response)
})

// farms routes
router.get("/farms/", (request, response) => {
  return FarmController.list(request, response)
})
router.post("/farms", (request, response) => {
  return createFarmController.handle(request, response)
})
router.patch("/farms/:farms_id", (request, response) => {
  return updateFarmController.handle(request, response)
})
router.delete("/farms/:farms_id", (request, response) => {
  return deleteFarmController.handle(request, response)
})

// Crops routes
router.get("/crops/", (request, response) => {
  return CropController.list(request, response)
})

router.post("/crops", (request, response) => {
  return createCropController.handle(request, response)
})
router.patch("/crops/:crop_id", (request, response) => {
  return updateCropController.handle(request, response)
})
router.delete("/crops/:crop_id", (request, response) => {
  return deleteCropController.handle(request, response)
})

export { router }
