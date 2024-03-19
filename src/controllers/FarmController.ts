import { Request, Response } from "express"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farm = require("./../models/Farmer.js")

const FarmController = {
  async list(request: Request, response: Response): Promise<object> {
    const model = await Farm.findAll()
    return response.send(model)
  },
}

export { FarmController }
