import { v4 as uuidv4 } from "uuid"
import { ICropDTO } from "../useCases/CropsUseCases/ICropDTO"

export class CropEntity {
  public readonly id: string | undefined

  public name: string | undefined

  constructor(props: Omit<ICropDTO, "id">, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuidv4()
    }
  }

  isValid(): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    if (!this.name) errors.push("Name is required.")

    return {
      valid: errors.length === 0,
      errors: errors,
    }
  }
}
