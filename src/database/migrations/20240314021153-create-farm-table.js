"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("farms", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      farmer_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "farmers", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      address_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "addresses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total_area: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      arable_area: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vegetation_area: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("farms")
  },
}
