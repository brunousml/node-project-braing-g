/* eslint-disable */
const { Model, DataTypes } = require("sequelize")

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        city: {
          type:DataTypes.STRING,
          allowNull: false
        },
        state: {
          type:DataTypes.STRING,
          allowNull: false
        },
      },
      {
        sequelize,
      },
    )
  }

  static associate(models) {
    // this.hasMany(models.Farm, { foreignKey: 'address_id', as: 'farms' })
  }
}

module.exports = Address
