"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("farms_crops", {
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
      crop_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "crops", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("farms_crops")
  },
}
