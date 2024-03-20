import { Request, Response } from "express"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farm = require("./../models/Farm")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farmer = require("./../models/Farmer")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Address = require("./../models/Address")

const FarmController = {
  async list(request: Request, response: Response): Promise<object> {
    const model = await Farm.findAll({
      include: [{
        model: Farmer,
        as: `farmer`
      },
        {
          model: Address,
          as: 'address'
        }]
    });
    return response.send(model)
  },
}

export { FarmController }
