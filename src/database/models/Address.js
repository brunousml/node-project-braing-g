const { Model, DataTypes } = require("sequelize")

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        city: DataTypes.STRING,
        state: DataTypes.STRING,
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
