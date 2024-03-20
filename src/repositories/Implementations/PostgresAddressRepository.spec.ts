import { PostgresAddressRepository } from "./PostgresAddressRepository"
import { AddressEntity } from "../../entities/AddressEntity"
import { uuid } from "uuidv4"

jest.mock("../../models/Address")
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Address = require("../../models/Address")

const AddressAttributeInput = { city: 'New York', state: 'NY' }
describe('PostgresAddressRepository', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })

  it('should successfully insert a valid address entity into the database', async () => {
    // Arrange
    const createdAddress = new AddressEntity(AddressAttributeInput)
    const addressRepository: PostgresAddressRepository = new PostgresAddressRepository();
    jest.spyOn(Address, 'create').mockResolvedValue(createdAddress);

    // Act
    const insertedAddress:AddressEntity = await addressRepository.insert(createdAddress);

    // Assert
    expect(insertedAddress).toBeInstanceOf(AddressEntity);
    expect(insertedAddress.city).toBe(createdAddress.city);
    expect(insertedAddress.state).toBe(createdAddress.state);

    expect(Address.create).toHaveBeenCalledTimes(1);
    expect(Address.create).toHaveBeenCalledWith(createdAddress);
  });

  it('should successfully update an existing address entity in the database', async () => {
    // Arrange
    const addressRepository: PostgresAddressRepository = new PostgresAddressRepository();

    const objectId: string = uuid()
    const currentObjectFields = AddressAttributeInput
    const newObjectFields = { city: 'Los Angeles', state: 'CA' }
    const currentAddressModelInstance = {
      id: objectId,
      set: jest.fn((newFields: never) => {
        Object.assign(currentAddressModelInstance, newFields);
      }),
      save: jest.fn(),
      ...currentObjectFields,
    }

    const toUpdateAddressEntity: AddressEntity = new AddressEntity(newObjectFields, objectId);

    jest.spyOn(Address, 'findByPk').mockResolvedValue(currentAddressModelInstance);

    // Act
    const result: AddressEntity = await addressRepository.update(objectId, toUpdateAddressEntity);

    // Assert
    expect(result).toBeInstanceOf(AddressEntity);
    expect(result.city).toBe(newObjectFields.city);
    expect(result.state).toBe(newObjectFields.state);

    expect(Address.findByPk).toHaveBeenCalledTimes(1);
    expect(Address.findByPk).toHaveBeenCalledWith(objectId);

    expect(currentAddressModelInstance.set).toHaveBeenCalledTimes(1);
    // expect(mockedAddressInstance.set).toHaveBeenCalledWith(updatedAddress);

    expect(currentAddressModelInstance.save).toHaveBeenCalledTimes(1);
  });

  it('should successfully delete an existing address entity from the database', async () => {
    // Arrange
    const objectId: string = uuid()
    const mockedAddressInstance = {
      id: objectId,
      ...(AddressAttributeInput),
      destroy: jest.fn()
    }

    jest.spyOn(Address, 'findByPk').mockResolvedValue(mockedAddressInstance);

    // Act
    const addressRepository: PostgresAddressRepository = new PostgresAddressRepository();
    await addressRepository.delete(objectId);

    // Assert
    expect(mockedAddressInstance.destroy).toHaveBeenCalledTimes(1);

    expect(Address.findByPk).toHaveBeenCalledTimes(1);
    expect(Address.findByPk).toHaveBeenCalledWith(objectId);
  });

  it.each([
      [{ city: ``, state: `NY` }, `City is required.`],
      [{ city: `New York`, state: `` }, `State is required.`]
    ])(
    'should throw an error when inserting an address entity with missing or invalid fields: %s',
    async (input, expectedErrorMessage)  => {
    // Arrange
      const invalidAddress = new AddressEntity(input);
      const addressRepository = new PostgresAddressRepository();

    // Act & Assert
      await expect(addressRepository.insert(invalidAddress)).rejects.toThrowError(expectedErrorMessage);
  });
});
