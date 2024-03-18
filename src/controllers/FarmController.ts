import { Request, Response } from "express"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farm = require("../database/models/Farm")

const FarmController = {
  async list(request: Request, response: Response): Promise<object> {
    const model = await Farm.findAll()
    return response.send(model)
  },
}

export { FarmController }
