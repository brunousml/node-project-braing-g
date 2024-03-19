const Sequelize = require("sequelize")
const dbConfig = require("./config")
//
const Farmer = require("../models/Farmer")
const Farm = require("../models/Farm")
const Address = require("../models/Address")
// const Crop = require('../models/Crop');

const connection = new Sequelize(dbConfig)

Farmer.init(connection)
Farm.init(connection)
Address.init(connection)
// Crop.init(connection);

Farm.associate(connection.models)
Address.associate(connection.models)
// Crop.associate(connection.models);

module.exports = connection
