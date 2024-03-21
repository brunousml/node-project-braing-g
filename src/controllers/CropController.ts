import { Request, Response } from "express"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Crop = require("../models/Crop")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farm = require("../models/Farm")

const CropController = {
  async list(request: Request, response: Response): Promise<object> {
    const model = await Crop.findAll({
      include: [{
        model: Farm,
        as: `farms`
      }]
    });
    return response.send(model)
  },
}

export { CropController }
