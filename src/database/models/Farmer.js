// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model, DataTypes } = require("sequelize")

class Farmer extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
        },
        cpf: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        cnpj: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        name: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "farmers",
      },
    )
  }
}

module.exports = Farmer
