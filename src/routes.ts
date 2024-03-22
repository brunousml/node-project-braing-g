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

/**
 * @swagger
 * /farmers:
 *   get:
 *     summary: List all farmers
 *     tags:
 *       - Farmers
 *     responses:
 *       200:
 *         description: An array of farmers
 *         schema:
 *           type: array
 *           items:
 *             ref: {}
 */
router.get("/farmers/", FarmerController.list)

/**
 * @swagger
 * /farmers:
 *   post:
 *     summary: Create a new farmer
 *     tags: [Farmers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ref: {}
 *     responses:
 *       201:
 *         description: The farmer was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               ref: {}
 *       500:
 *         description: Some server error
 */
router.post("/farmers", (request, response) => {
  return createFarmerController.handle(request, response)
})

/**
 * @swagger
 * farmers/{farmer_id}:
 *   patch:
 *     summary: Update a farmer
 *     tags:
 *       - Farmers
 *     parameters:
 *       - in: path
 *         name: farmer_id
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ref: {}
 *     responses:
 *       200:
 *         description: The farmer was successfully updated
 *         schema:
 *           ref: {}
 */
router.patch("/farmers/:farmer_id", (request, response) => {
  return updateFarmerController.handle(request, response)
})

/**
 * @swagger
 * /farmers/{farmer_id}:
 *    delete:
 *     summary: Delete a farmer
 *     tags:
 *       - Farmers
 *     parameters:
 *       - in: path
 *         name: farmer_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The farmer was successfully deleted
 */
router.delete("/farmers/:farmer_id", (request, response) => {
  return deleteFarmerController.handle(request, response)
})

// Addresses routes
/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: List all addresses
 *     tags:
 *       - Addresses
 *     responses:
 *       200:
 *         description: An array of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 ref: {}
 */
router.get("/addresses/", (request, response) => {
  return AddressController.list(request, response)
})

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Create a new address
 *     tags:
 *       - Addresses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ref: {}
 *     responses:
 *       201:
 *         description: The address was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               ref: {}
 */
router.post("/addresses", (request, response) => {
  return createAddressController.handle(request, response)
})

/**
 * @swagger
 * /addresses/{address_id}:
 *   patch:
 *     summary: Update an address
 *     tags:
 *       - Addresses
 *     parameters:
 *       - in: path
 *         name: address_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ref: {}
 *     responses:
 *       200:
 *         description: The address was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               ref: {}
 */
router.patch("/addresses/:address_id", (request, response) => {
  return updateAddressController.handle(request, response)
})

/**
 * @swagger
 * /addresses/{address_id}:
 *   delete:
 *     summary: Delete an address
 *     tags:
 *       - Addresses
 *     parameters:
 *       - in: path
 *         name: address_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The address was successfully deleted
 */
router.delete("/addresses/:address_id", (request, response) => {
  return deleteAddressController.handle(request, response)
})

// farms routes
/**
 * @swagger
 * /farms:
 *   get:
 *     summary: List all addresses
 *     tags:
 *       - Farms
 *     responses:
 *       200:
 *         description: An array of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 ref: {}
 */
router.get("/farms/", (request, response) => {
  return FarmController.list(request, response)
})

/**
 * @swagger
 * /farms:
 *   post:
 *     summary: Create a new farms
 *     tags:
 *       - Farms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ref: {}
 *     responses:
 *       201:
 *         description: The address was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               ref: {}
 */
router.post("/farms", (request, response) => {
  return createFarmController.handle(request, response)
})

/**
 * @swagger
 * /farms/{farm_id}:
 *   patch:
 *     summary: Update a farm
 *     tags:
 *       - Farms
 *     parameters:
 *       - in: path
 *         name: farms_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ref: {}
 *     responses:
 *       200:
 *         description: The farms was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $=ref: {}
 */
router.patch("/farms/:farms_id", (request, response) => {
  return updateFarmController.handle(request, response)
})

/**
 * @swagger
 * /farms/{farms_id}:
 *   delete:
 *     summary: Delete a farm
 *     tags:
 *       - Farms
 *     parameters:
 *       - in: path
 *         name: farms_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The farm was successfully deleted
 */
router.delete("/farms/:farms_id", (request, response) => {
  return deleteFarmController.handle(request, response)
})

// Crops routes
/**
 * @swagger
 * /crops:
 *   get:
 *     summary: List all crops
 *     tags:
 *       - Crops
 *     responses:
 *       200:
 *         description: An array of crops
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 ref: {}
 */
router.get("/crops/", (request, response) => {
  return CropController.list(request, response)
})

/**
 * @swagger
 * /crops:
 *   post:
 *     summary: Create a new crop
 *     tags:
 *       - Crops
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ref: {}
 *     responses:
 *       201:
 *         description: The crop was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               ref: {}
 */
router.post("/crops", (request, response) => {
  return createCropController.handle(request, response)
})

/**
 * @swagger
 * /crops/{crop_id}:
 *   patch:
 *     summary: Update a crop
 *     tags:
 *       - Crops
 *     parameters:
 *       - in: path
 *         name: crop_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             ref: {}
 *     responses:
 *       200:
 *         description: The crop was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               ref: {}
 */
router.patch("/crops/:crop_id", (request, response) => {
  return updateCropController.handle(request, response)
})

/**
 * @swagger
 * /crops/{crop_id}:
 *   delete:
 *     summary: Delete a crop
 *     tags:
 *       - Crops
 *     parameters:
 *       - in: path
 *         name: crop_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The crop was successfully deleted
 */
router.delete("/crops/:crop_id", (request, response) => {
  return deleteCropController.handle(request, response)
})

export { router }
