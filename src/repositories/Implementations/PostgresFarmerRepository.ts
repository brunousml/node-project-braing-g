import { FarmerEntity } from "../../entities/FarmerEntity"
import { IFarmerRepository } from "../IFarmerRepository"
import Farm from "../../models/Farm"
import Address from "../../models/Address"
import Crop from "../../models/Crop"

// eslint-disable-next-line
const Farmer = require('../../models/Farmer.js')

export class PostgresFarmerRepository implements IFarmerRepository {
  async insert(farmer: FarmerEntity): Promise<FarmerEntity> {
    const validationResult = farmer.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    return await Farmer.create(farmer)
  }

  async update(id: string, farmerEntity: FarmerEntity): Promise<FarmerEntity> {
    // Validate that address already exists
    const origin = await Farmer.findByPk(id)
    if (!origin) throw new Error(`Entity not found`)

    // Set new values from request
    origin.set(farmerEntity)
    const { name, cpf, cnpj } = origin
    const newFarmer: FarmerEntity = new FarmerEntity({ name, cpf, cnpj  }, id)

    // Validate it before save
    const validationResult = farmerEntity.isValid()
    if (!validationResult.valid)
      throw new Error(
        `Missing required fields: ${validationResult.errors.join()}`,
      )

    await origin.save()
    return newFarmer
  }

  async delete(id: string): Promise<void> {
    const farmer = await Farmer.findByPk(id)
    if (!farmer) throw new Error(`Entity not found`)
    await farmer.destroy()
  }

  async dashboard(id: string): Promise<object> {
    const farmer = await Farmer.findByPk(id, {
      include: [
        {
          model: Farm,
          as: `farms`,
          include: [{
            model: Address,
            as: "address"
          },
            {
              model: Crop,
              as: "crops",
              through: 'farms_crops'
            }]
        }
      ]
    });

    if(!farmer || !farmer.farms) return {
      total: 0,
      hectares: 0,
      byState: {},
      byCrop: {},
      byVegetationAndArabelArea: {},
    }

    const hectares = farmer.farms.reduce((total: number, farm: { totalArea: number}) => total + farm.totalArea, 0);
    const byState = farmer.farms.reduce((totalByState: {[state: string]: number }, farm: {address: {state: string}, totalArea: number}) => {
      if (!totalByState[farm.address.state]) {
        totalByState[farm.address.state] = 0;
      }
      totalByState[farm.address.state] += farm.totalArea;
      return totalByState;
    }, {});
    const byCrop = farmer.farms.reduce((totalByCrop: {[state: string]: number }, farm: {crops: {name: string}[], totalArea: number}) => {
      for (const crop in farm.crops) {
        const name = farm.crops[crop].name
        if (!totalByCrop[name]) {
          totalByCrop[name] = 0;
        }
        totalByCrop[name] += farm.totalArea;
      }
      return totalByCrop;

    }, {});

    const byVegetationAndArabelArea  = farmer.farms.reduce((totalByVegetationAndArabelArea: {[name: string]: {vegetationArea: number, arabelArea:number }}, farm: {arableArea: number, vegetationArea: number, name: string}) => {
      totalByVegetationAndArabelArea[farm.name] = {
        vegetationArea: farm.vegetationArea,
        arabelArea: farm.arableArea,
      }
      return totalByVegetationAndArabelArea;
    }, {})

    return {
      total: farmer.farms.length,
      hectares,
      byState,
      byCrop,
      byVegetationAndArabelArea,
    }
  }
}
