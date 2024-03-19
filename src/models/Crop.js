/* eslint-disable */
const { Model, DataTypes } = require("sequelize")

class Crop extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.ENUM({
          values: ["soy", "corn", "coffee", "sugarcane"],
        }),
      },
      {
        sequelize,
      },
    )
  }

  static associate(models) {
    this.belongsToMany(models.Farm, {
      foreignKey: "farm_id",
      through: "farms_crops",
      as: "farms",
    })
  }
}

module.exports = Crop
