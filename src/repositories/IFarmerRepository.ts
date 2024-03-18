import { FarmerEntity } from "../entities/FarmerEntity"

export interface IFarmerRepository {
  insert(farmer: FarmerEntity): Promise<FarmerEntity>
  update(id: string, farmer: FarmerEntity): Promise<FarmerEntity>
  delete(id: string): Promise<void>
}
