const { connections, Sequelize } = require("./sequelize");

/**
 * Represents a purchase.
 * @constructor
 * @param {string} id
 * @param {string} date
 * @param {int} quantity
 */
let purchaseSchema = connections.define("purchases", {
    id: Sequelize.STRING,
    receiving: {
        type: Sequelize.DATEONLY
    },
    itemId: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER
});
/** @module purchase/model */
module.exports = { Purchase: purchaseSchema }