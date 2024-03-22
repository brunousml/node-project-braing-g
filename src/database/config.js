const dbConfig = {
  dialect: "postgres",
  host: "postgres",
  port: 5432,
  username: "user",
  password: "pass",
  database: "brain",
  seederStorage: 'sequelize',
  define: {
    timestamps: true,
    underscored: true,
  },
}

module.exports = dbConfig
