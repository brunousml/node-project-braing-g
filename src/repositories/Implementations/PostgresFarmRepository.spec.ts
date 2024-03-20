import { PostgresFarmRepository } from "./PostgresFarmRepository"
import { FarmEntity } from "../../entities/FarmEntity"
import { uuid } from "uuidv4"
import { faker } from "@faker-js/faker"

jest.mock("../../models/Farm")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farm = require("../../models/Farm")

const FarmAttributeInput = {
  name: faker.word.noun(),
  totalArea: 100,
  arableArea: 70,
  vegetationArea: 30
}
describe('PostgresFarmRepository', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('should successfully insert a valid Farm entity into the database', async () => {
    // Arrange
    const createdFarm = new FarmEntity(FarmAttributeInput)
    const FarmRepository: PostgresFarmRepository = new PostgresFarmRepository();
    jest.spyOn(Farm, 'create').mockResolvedValue(createdFarm);

    // Act
    const insertedFarm:FarmEntity = await FarmRepository.insert(createdFarm);

    // Assert
    expect(insertedFarm).toBeInstanceOf(FarmEntity);
    expect(insertedFarm.name).toBe(createdFarm.name);
    expect(insertedFarm.totalArea).toBe(createdFarm.totalArea);
    expect(insertedFarm.arableArea).toBe(createdFarm.arableArea);
    expect(insertedFarm.vegetationArea).toBe(createdFarm.vegetationArea);

    expect(Farm.create).toHaveBeenCalledTimes(1);
    expect(Farm.create).toHaveBeenCalledWith(createdFarm);
  });

  it('should successfully update an existing Farm entity in the database', async () => {
    // Arrange
    const FarmRepository: PostgresFarmRepository = new PostgresFarmRepository();

    const objectId: string = uuid()
    const currentFarmModelInstance = {
      id: objectId,
      ...FarmAttributeInput,
      set: jest.fn((newFields: never) => {
        Object.assign(currentFarmModelInstance, newFields);
      }),
      save: jest.fn()
    }
    jest.spyOn(Farm, 'findByPk').mockResolvedValue(currentFarmModelInstance);

    const toUpdateFarmEntity: FarmEntity = new FarmEntity({
      name: faker.person.firstName(),
      totalArea: 100,
      vegetationArea: 50,
      arableArea:  50,
    }, objectId);

    // Act
    const result: FarmEntity = await FarmRepository.update(objectId, toUpdateFarmEntity);

    // Assert
    expect(result).toBeInstanceOf(FarmEntity);
    expect(result.name).toBe(toUpdateFarmEntity.name);
    expect(result.vegetationArea).toBe(toUpdateFarmEntity.vegetationArea);
    expect(result.totalArea).toBe(toUpdateFarmEntity.totalArea);
    expect(result.arableArea).toBe(toUpdateFarmEntity.arableArea);

    // assert sequelize steps to update
    expect(Farm.findByPk).toHaveBeenCalledTimes(1);
    expect(Farm.findByPk).toHaveBeenCalledWith(objectId);

    expect(currentFarmModelInstance.set).toHaveBeenCalledTimes(1);
    expect(currentFarmModelInstance.set).toHaveBeenCalledWith(toUpdateFarmEntity);

    expect(currentFarmModelInstance.save).toHaveBeenCalledTimes(1);
  });

  it('should successfully delete an existing Farm entity from the database', async () => {
    // Arrange
    const FarmRepository: PostgresFarmRepository = new PostgresFarmRepository();

    const objectId: string = uuid()
    const currentFarmModelInstance = {id: objectId, ...FarmAttributeInput, destroy: jest.fn()}
    jest.spyOn(Farm, 'findByPk').mockResolvedValue(currentFarmModelInstance);

    // Act
    await FarmRepository.delete(objectId);

    // Assert
    expect(currentFarmModelInstance.destroy).toHaveBeenCalledTimes(1);

    expect(Farm.findByPk).toHaveBeenCalledTimes(1);
    expect(Farm.findByPk).toHaveBeenCalledWith(objectId);
  });

  it.each([
    [{ name: 'atalia farm', totalArea: 100, arableArea: 70, vegetationArea: 0 }, 'vegetationArea is required.'],
    [{ name: '', totalArea: 100, arableArea: 70, vegetationArea: 30 }, 'name is required.'],
    [{ name: 'sunrise farm', totalArea: -50, arableArea: 70, vegetationArea: 30 }, 'Missing required fields: arableArea plus vegetationArea needs to be less or equal total area'],
    [{ name: 'green acres', totalArea: 100, arableArea: 100, vegetationArea: 30 }, 'Missing required fields: arableArea plus vegetationArea needs to be less or equal total area'],
  ])(
    'should throw an error when inserting an Farm entity with missing or invalid fields: %s',
    async (input, expectedErrorMessage)  => {
      // Arrange
      const invalidFarm = new FarmEntity(input);
      const FarmRepository = new PostgresFarmRepository();

      // Act & Assert
      await expect(FarmRepository.insert(invalidFarm)).rejects.toThrowError(expectedErrorMessage);
    });
});
