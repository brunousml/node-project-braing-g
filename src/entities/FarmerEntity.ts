import { v4 as uuidv4 } from "uuid"
import { IFarmerDTO } from "../useCases/FarmersUseCases/IFarmerDTO"
import { cnpj as CNPJValidator, cpf as CPFValidator } from "cpf-cnpj-validator"

export class FarmerEntity {
  public readonly id: string | undefined

  public cpf: string | undefined
  public cnpj: string | undefined
  public name: string | undefined

  constructor(props: Omit<IFarmerDTO, "id">, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = uuidv4()
    }
  }

  isValid(): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    if (!this.name) errors.push("Name is required.")
    if (!this.cpf && !this.cnpj) errors.push("Either CPF or CNPJ is required.")
    if (this.cpf && !CPFValidator.isValid(this.cpf))
      errors.push("CPF is invalid.")
    if (this.cnpj && !CNPJValidator.isValid(this.cnpj))
      errors.push("CNPJ is invalid.")

    return {
      valid: errors.length === 0,
      errors: errors,
    }
  }
}
