import { Request, Response } from "express"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Address = require("../database/models/Address")

const AddressController = {
  async list(request: Request, response: Response): Promise<object> {
    const model = await Address.findAll()
    return response.send(model)
  },
}

export { AddressController }
