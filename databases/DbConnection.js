const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: 0, //0 is false 1 is true co the pass thang false vao nhung no se bao DeprecateWarning
    pool: {
      max: parseInt(process.env.DB_POOL_MAX),
      min: parseInt(process.env.DB_POOL_MIN),
      acquire: parseInt(process.env.DB_ACQUIRE),
      idle: parseInt(process.env.DB_POOL_IDLE),
    },
    timezone: process.env.TIME_ZONE,
  },
  {
    logging: console.log,
  }
);

module.exports = sequelize;
