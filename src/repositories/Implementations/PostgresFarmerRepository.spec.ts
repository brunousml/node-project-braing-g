import { PostgresFarmerRepository } from "./PostgresFarmerRepository"
import { FarmerEntity } from "../../entities/FarmerEntity"
import { uuid } from "uuidv4"
import { faker } from "@faker-js/faker"
import { cnpj as CNPJValidator, cpf as CPFValidator } from "cpf-cnpj-validator"

jest.mock("../../models/Farmer")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Farmer = require("../../models/Farmer")

const FarmerAttributeInput = {
  name: faker.person.firstName(),
  cnpj: CNPJValidator.generate(),
  cpf: CPFValidator.generate()
}
describe('PostgresFarmerRepository', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('should successfully insert a valid Farmer entity into the database', async () => {
    // Arrange
    const createdFarmer = new FarmerEntity(FarmerAttributeInput)
    const FarmerRepository: PostgresFarmerRepository = new PostgresFarmerRepository();
    jest.spyOn(Farmer, 'create').mockResolvedValue(createdFarmer);

    // Act
    const insertedFarmer:FarmerEntity = await FarmerRepository.insert(createdFarmer);

    // Assert
    expect(insertedFarmer).toBeInstanceOf(FarmerEntity);
    expect(insertedFarmer.name).toBe(createdFarmer.name);
    expect(insertedFarmer.cpf).toBe(createdFarmer.cpf);
    expect(insertedFarmer.cnpj).toBe(createdFarmer.cnpj);

    expect(Farmer.create).toHaveBeenCalledTimes(1);
    expect(Farmer.create).toHaveBeenCalledWith(createdFarmer);
  });

  it('should successfully update an existing Farmer entity in the database', async () => {
    // Arrange
    const FarmerRepository: PostgresFarmerRepository = new PostgresFarmerRepository();

    const objectId: string = uuid()
    const currentFarmerModelInstance = {
      id: objectId,
      ...FarmerAttributeInput,
      set: jest.fn((newFields: never) => {
        Object.assign(currentFarmerModelInstance, newFields);
      }),
      save: jest.fn()
    }
    jest.spyOn(Farmer, 'findByPk').mockResolvedValue(currentFarmerModelInstance);

    const toUpdateFarmerEntity: FarmerEntity = new FarmerEntity({
      name: faker.person.firstName(),
      cpf: CPFValidator.generate(),
      cnpj:CNPJValidator.generate()
    }, objectId);

    // Act
    const result: FarmerEntity = await FarmerRepository.update(objectId, toUpdateFarmerEntity);

    // Assert
    expect(result).toBeInstanceOf(FarmerEntity);
    expect(result.name).toBe(toUpdateFarmerEntity.name);
    expect(result.cpf).toBe(toUpdateFarmerEntity.cpf);
    expect(result.cnpj).toBe(toUpdateFarmerEntity.cnpj);

    // assert sequelize steps to update
    expect(Farmer.findByPk).toHaveBeenCalledTimes(1);
    expect(Farmer.findByPk).toHaveBeenCalledWith(objectId);

    expect(currentFarmerModelInstance.set).toHaveBeenCalledTimes(1);
    expect(currentFarmerModelInstance.set).toHaveBeenCalledWith(toUpdateFarmerEntity);

    expect(currentFarmerModelInstance.save).toHaveBeenCalledTimes(1);
  });

  it('should successfully delete an existing Farmer entity from the database', async () => {
    // Arrange
    const FarmerRepository: PostgresFarmerRepository = new PostgresFarmerRepository();

    const objectId: string = uuid()
    const currentFarmerModelInstance = {id: objectId, ...FarmerAttributeInput, destroy: jest.fn()}
    jest.spyOn(Farmer, 'findByPk').mockResolvedValue(currentFarmerModelInstance);

    // Act
    await FarmerRepository.delete(objectId);

    // Assert
    expect(currentFarmerModelInstance.destroy).toHaveBeenCalledTimes(1);

    expect(Farmer.findByPk).toHaveBeenCalledTimes(1);
    expect(Farmer.findByPk).toHaveBeenCalledWith(objectId);
  });

  it.each([
    [{ cpf: `validCPF`, cnpj: `validCNPJ`, name: '' }, `Name is required.`],
    // Assuming you want to test for both CPF and CNPJ being missing
    [{ name: `John Doe` , cpf: '', cnpj: ''}, `Either CPF or CNPJ is required.`],
    // Assuming you want to test for an invalid CPF (assuming `invalidCPF` is not a valid CPF format)
    [{ name: `John Doe`, cpf: `invalidCPF`, cnpj: '' }, `CPF is invalid.`],
    // Assuming you want to test for an invalid CNPJ (assuming `invalidCNPJ` is not a valid CNPJ format)
    [{ name: `John Doe`, cnpj: `invalidCNPJ`, cpf: '' }, `CNPJ is invalid.`],
  ])(
    'should throw an error when inserting an Farmer entity with missing or invalid fields: %s',
    async (input, expectedErrorMessage)  => {
      // Arrange
      const invalidFarmer = new FarmerEntity(input);
      const FarmerRepository = new PostgresFarmerRepository();

      // Act & Assert
      await expect(FarmerRepository.insert(invalidFarmer)).rejects.toThrowError(expectedErrorMessage);
    });
});
