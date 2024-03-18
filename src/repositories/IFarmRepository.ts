import { FarmEntity } from "../entities/FarmEntity"

export interface IFarmRepository {
  insert(farm: FarmEntity): Promise<FarmEntity>
  update(id: string, farm: FarmEntity): Promise<FarmEntity>
  delete(id: string): Promise<void>
}
