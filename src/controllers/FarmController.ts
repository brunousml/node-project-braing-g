import { Request, Response } from "express"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farm = require("./../models/Farm")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farmer = require("./../models/Farmer")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Address = require("./../models/Address")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Crop = require("./../models/Crop")

const FarmController = {
  async list(request: Request, response: Response): Promise<object> {
    const model = await Farm.findAll(
      {
        include: [{
          model: Farmer,
          as: `farmer`
        },
        {
          model: Address,
          as: 'address'
        },
        {
          model: Crop,
          as: 'crops',
          through: 'farms_crops'
        }]
      },
    );
    return response.send(model)
  },
}

export { FarmController }
