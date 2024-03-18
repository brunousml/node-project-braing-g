import { v4 as uuidv4 } from "uuid"
import { IFarmDTO } from "../useCases/FarmsUseCases/IFarmDTO"

export class FarmEntity {
  public readonly id: string | undefined

  public name: string | undefined
  public totalArea: number | undefined
  public arableArea: number | undefined
  public vegetationArea: number | undefined

  constructor(props: Omit<IFarmDTO, "id">, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuidv4()
    }
  }

  isValid(): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    // Required
    if (!this.name) errors.push("farmName is required.")
    if (!this.totalArea) errors.push("totalArea is required.")
    if (!this.arableArea) errors.push("arableArea is required.")
    if (!this.vegetationArea) errors.push("vegetationArea is required.")

    // type check
    if (typeof this.totalArea != "number")
      errors.push("Wrong type of totalArea.")
    if (typeof this.arableArea != "number")
      errors.push("Wrong type of arableArea")
    if (typeof this.vegetationArea != "number")
      errors.push("Wrong type of vegetationArea")

    // check total area
    if (this.totalArea && this.arableArea && this.vegetationArea) {
      const isAreaValid =
        this.arableArea + this.vegetationArea <= this.totalArea
      if (!isAreaValid)
        errors.push(
          "arableArea plus vegetationArea needs to be less or equal total area",
        )
    }

    return {
      valid: errors.length === 0,
      errors: errors,
    }
  }
}
