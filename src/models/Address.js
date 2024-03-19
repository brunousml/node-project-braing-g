// eslint-disable-next-line @typescript-eslint/no-var-requires
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static associate(models) {
    // this.hasMany(models.Farm, { foreignKey: 'address_id', as: 'farms' })
  }
}

// eslint-disable-next-line no-undef
module.exports = Address
