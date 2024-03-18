import { Request, Response } from "express"
import IController from "./IController"
import { uuid } from "uuidv4"
import { cnpj as CNPJValidator, cpf as CPFValidator } from "cpf-cnpj-validator"
import { IFarmerDTO } from "../useCases/FarmersUseCases/IFarmerDTO"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farmer = require("../database/models/Farmer")

const isFarmerValid = (body: IFarmerDTO) => {
  const { name, cpf, cnpj } = body
  if (!name) return false
  if (!cpf && !cnpj) return false
  if (!cnpj && !CPFValidator.isValid(<string>cpf)) return false
  if (!cpf && !CNPJValidator.isValid(<string>cnpj)) return false

  return true
}

const FarmerController: IController = {
  async delete(request: Request, response: Response): Promise<object> {
    const { farmer_id } = request.params

    const farmer = await Farmer.findByPk(farmer_id)
    if (!farmer) return response.status(404).send()

    try {
      await farmer.destroy()
      return response.status(204).send()
    } catch (error) {
      return response.status(500).send(error)
    }
  },

  async update(request: Request, response: Response): Promise<object> {
    const { farmer_id } = request.params

    try {
      const farmer = await Farmer.findByPk(farmer_id)
      if (!farmer) return response.status(404).send()

      await farmer.update(request.body)
      return response.status(200).send(farmer)
    } catch (error) {
      return response.status(500).send(error)
    }
  },

  async list(request: Request, response: Response): Promise<object> {
    const farmers = await Farmer.findAll()
    return response.send(farmers)
  },

  async create(request: Request, response: Response): Promise<object> {
    const id: string = uuid()
    try {
      if (isFarmerValid(request.body)) {
        return response.status(400).send("Missing required fields")
      }
      const farmer = await Farmer.create({ id, ...request.body })
      return response.status(201).json(farmer)
    } catch (error) {
      return response.status(500).send(error)
    }
  },
}

export { FarmerController }
