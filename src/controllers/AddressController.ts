import { Request, Response } from "express"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Address = require("../models/Address")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farm = require("../models/Farm")

const AddressController = {
  async list(request: Request, response: Response): Promise<object> {
    const model = await Address.findAll({
      include: [{
        model: Farm,
        as: `farms`
      }]
    });
    return response.send(model)
  },
}

export { AddressController }
