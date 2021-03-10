const { connections, Sequelize } = require("./sequelize");

/**
 * Represents an item.
 * @constructor
 * @param {int} id
 * @param {int} available
 */
let itemSchema = connections.define("items", {
    id: Sequelize.INTEGER,
    available: Sequelize.INTEGER
});
/** @module item/model */
module.exports = { Item: itemSchema }