import { Request, Response } from "express"

export default interface IController {
  list(request: Request, response: Response): Promise<object>
  create(request: Request, response: Response): Promise<object>
  update(request: Request, response: Response): Promise<object>
  delete(request: Request, response: Response): Promise<object>
}
