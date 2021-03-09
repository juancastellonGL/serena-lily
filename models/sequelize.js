const Sequelize = require("sequelize");
const { database } = require("config");

let sequelize = null;
module.exports = {
  connections: (() => {
    if (!sequelize) {
      sequelize = new Sequelize(database.database, database.user, database.password, {
            host: database.host,
            dialect: 'mysql',
            port: '3306'
          });
    }
    return sequelize;
  })(),
  Sequelize
};
