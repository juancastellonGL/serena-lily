const { connections, Sequelize } = require("./sequelize");

/**
 * Represents an item.
 * @constructor
 * @param {int} id
 * @param {int} available
 */
let itemSchema = connections.define("items", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    available: Sequelize.INTEGER
}, {
    timestamps: false
});
/** @module item/model */
module.exports = { Item: itemSchema }