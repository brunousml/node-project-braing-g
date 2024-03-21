import { PostgresCropRepository } from "./PostgresCropRepository"
import { CropEntity } from "../../entities/CropEntity"
import { uuid } from "uuidv4"
import { faker } from "@faker-js/faker"

jest.mock("../../models/Crop")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Crop = require("../../models/Crop")

jest.mock("../../models/Farm")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farm = require("../../models/Farm")

const CropAttributeInput = { name: 'sugarcane' }
describe('PostgresCropRepository', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('should successfully insert a valid Crop entity into the database', async () => {
    // Arrange
    const createdCrop = new CropEntity(CropAttributeInput)
    const cropInstanceMocked = {addFarm: jest.fn(), ...createdCrop}
    const CropRepository: PostgresCropRepository = new PostgresCropRepository();
    jest.spyOn(Crop, 'create').mockResolvedValue(cropInstanceMocked as never);
    jest.spyOn(Crop, 'findOne').mockResolvedValue(null);
    // jest.spyOn(Crop, 'addFarm').mockResolvedValue(null);

    const farmInstanceMocked = {id: faker.string.uuid(), addCrop: jest.fn()}
    jest.spyOn(Farm, 'findByPk').mockResolvedValue(farmInstanceMocked as never);

    // Act
    const insertedCrop:CropEntity = await CropRepository.insert(createdCrop);

    // Assert
    expect(insertedCrop).toBeInstanceOf(CropEntity);
    expect(insertedCrop.name).toBe(createdCrop.name);

    expect(cropInstanceMocked.addFarm).toHaveBeenCalledTimes(1);
    expect(Crop.findOne).toHaveBeenCalledTimes(1);
    expect(Crop.create).toHaveBeenCalledTimes(1);
    expect(Crop.create).toHaveBeenCalledWith(createdCrop);

    expect(Farm.findByPk).toHaveBeenCalledTimes(1);
    expect(farmInstanceMocked.addCrop).toHaveBeenCalledTimes(1);
  });

  it('should successfully update an existing Crop entity in the database', async () => {
    // Arrange
    const CropRepository: PostgresCropRepository = new PostgresCropRepository();

    const objectId: string = uuid()
    const currentObjectFields = CropAttributeInput
    const newObjectFields = { name: 'rice' }
    const currentCropModelInstance = {
      id: objectId,
      set: jest.fn((newFields: never) => {
        Object.assign(currentCropModelInstance, newFields);
      }),
      save: jest.fn(),
      ...currentObjectFields,
    }

    const toUpdateCropEntity: CropEntity = new CropEntity(newObjectFields, objectId);

    jest.spyOn(Crop, 'findByPk').mockResolvedValue(currentCropModelInstance);

    // Act
    const result: CropEntity = await CropRepository.update(objectId, toUpdateCropEntity);

    // Assert
    expect(result).toBeInstanceOf(CropEntity);
    expect(result.name).toBe(newObjectFields.name);

    expect(Crop.findByPk).toHaveBeenCalledTimes(1);
    expect(Crop.findByPk).toHaveBeenCalledWith(objectId);

    expect(currentCropModelInstance.set).toHaveBeenCalledTimes(1);
    expect(currentCropModelInstance.set).toHaveBeenCalledWith(newObjectFields);

    expect(currentCropModelInstance.save).toHaveBeenCalledTimes(1);
  });

  it('should successfully delete an existing Crop entity from the database', async () => {
    // Arrange
    const objectId: string = uuid()
    const mockedCropInstance = {
      id: objectId,
      ...(CropAttributeInput),
      destroy: jest.fn()
    }

    jest.spyOn(Crop, 'findByPk').mockResolvedValue(mockedCropInstance);

    // Act
    const CropRepository: PostgresCropRepository = new PostgresCropRepository();
    await CropRepository.delete(objectId);

    // Assert
    expect(mockedCropInstance.destroy).toHaveBeenCalledTimes(1);

    expect(Crop.findByPk).toHaveBeenCalledTimes(1);
    expect(Crop.findByPk).toHaveBeenCalledWith(objectId);
  });

  it.each([
      [{ name: '' }, `Name is required.`],
    ])(
    'should throw an error when inserting an Crop entity with missing or invalid fields: %s',
    async (input, expectedErrorMessage)  => {
    // Arrange
      const invalidCrop = new CropEntity(input);
      const CropRepository = new PostgresCropRepository();

    // Act & Assert
      await expect(CropRepository.insert(invalidCrop)).rejects.toThrowError(expectedErrorMessage);
  });
});
