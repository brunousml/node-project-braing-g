const dbConfig = {
  dialect: "postgres",
  host: "localhost",
  username: "user",
  password: "pass",
  database: "brain",
  define: {
    timestamps: true,
    underscored: true,
  },
}

module.exports = dbConfig
