const { connections, Sequelize } = require("./sequelize");

let itemSchema = connections.define("items", {
    id: Sequelize.INTEGER,
    available: Sequelize.INTEGER
});
module.exports = { User: itemSchema }