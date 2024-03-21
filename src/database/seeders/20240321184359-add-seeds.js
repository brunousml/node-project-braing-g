'use strict';

const { cnpj: CNPJValidator,  cpf: CPFValidator,} = require("cpf-cnpj-validator")
// const { uuid } = require("uuidv4")
const { faker } = require('@faker-js/faker');
const { DataTypes } = require("sequelize")


const farmerSeeds = (amount)=> {
  const seed = []

  for (let i = 0; i < amount; i++) {
    seed.push({
      id:faker.string.uuid(),
      name: faker.person.fullName(),
      cpf: CPFValidator.generate(),
      cnpj: CNPJValidator.generate(),
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  return seed
}

function getRandomValueBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const addressSeeds = (amount)=> {
  const seed = []

  for (let i = 0; i < amount; i++) {
    seed.push({
      id:faker.string.uuid(),
      city: faker.location.city(),
      state: faker.location.state(),
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  return seed
}

const farmSeeds = (amount, farmerId, addressId)=> {
  const seed = []

  for (let i = 0; i < amount; i++) {
    seed.push({
      id:faker.string.uuid(),
      name: faker.company.name() + " farm",
      farmer_id: farmerId,
      address_id: addressId,
      total_area: 100,
      arable_area: getRandomValueBetween(50, 70),
      vegetation_area: getRandomValueBetween(1,30),
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  return seed
}

const cropSeeds = ()=> {
  return [
    {
      id:faker.string.uuid(),
      name: 'soy',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:faker.string.uuid(),
      name: 'corn',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:faker.string.uuid(),
      name: 'coffee',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:faker.string.uuid(),
      name: 'sugarcane',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]
}

const farmsCropsSeeds = (farmers, crops) => [
  {
    farm_id: farmers[0].id,
    crop_id: crops[0].id,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    farm_id: farmers[0].id,
    crop_id: crops[1].id,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    farm_id: farmers[0].id,
    crop_id: crops[2].id,
    created_at: new Date(),
    updated_at: new Date()
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const farmers = farmerSeeds(10)
    const addresses = addressSeeds(2)
    const crops = cropSeeds()
    const farms = farmSeeds(2, farmers[0].id, addresses[0].id)

    // Base tables
    await queryInterface.bulkInsert('farmers', farmers);
    await queryInterface.bulkInsert('addresses', addresses);
    await queryInterface.bulkInsert('crops', crops);

    // Associations
    await queryInterface.bulkInsert('farms', farms);
    await queryInterface.bulkInsert('farms_crops', farmsCropsSeeds(farms, crops));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('farmers', null, {});
    await queryInterface.bulkDelete('addresses', null, {});
    await queryInterface.bulkDelete('farms', null, {});
    await queryInterface.bulkDelete('crops', null, {});
    await queryInterface.bulkDelete('farms_crops', null, {});
  }
};