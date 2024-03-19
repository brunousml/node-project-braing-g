/*eslint-disable */
const { Model, DataTypes } = require("sequelize")

class Farm extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        totalArea: DataTypes.INTEGER,
        arableArea: DataTypes.INTEGER,
        vegetationArea: DataTypes.INTEGER,
      },
      {
        sequelize,
      },
    )
  }

  static associate(models) {
    // this.belongsTo(models.Farmer, { foreignKey: 'farmer_id', as: 'farmer' })
    // this.hasOne(models.Address, { foreignKey: 'address_id', as: 'address' })
    // this.belongsToMany(models.Crop, { foreignKey: 'crop_id', through:'farms_crops', as: 'crops' });
  }
}

module.exports = Farm
