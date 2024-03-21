import { Request, Response } from "express"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farmer = require("../models/Farmer")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Address = require("../models/Address")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Crop = require("../models/Crop")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farm = require("../models/Farm")

/**
 * Generate dashboard results based on farmer's farms.
 *
 * @param {Request} request - the request object
 * @param {Response} response - the response object
 * @return {Promise<object>} the dashboard results object
 */
const DashboardController = {
  async list(request: Request, response: Response): Promise<object> {
    const { farmer_id } = request.params
    const farmer = await Farmer.findByPk(farmer_id, {
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
    if(!farmer) response.status(404).send()

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

    const dashboardResults = {
      total: farmer.farms.length,
      hectares,
      byState,
      byCrop,
      byVegetationAndArabelArea,
    }

    return response.send(dashboardResults)
  },
}

export { DashboardController }
