"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("farms_crops", {
      farm_id: {
        type: Sequelize.UUID,
        references: { model: "farms", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      crop_id: {
        type: Sequelize.UUID,
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
