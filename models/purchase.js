const { connections, Sequelize } = require("./sequelize");

/**
 * Represents a purchase.
 * @constructor
 * @param {string} id
 * @param {string} date
 * @param {int} quantity
 */
let purchaseSchema = connections.define("purchases", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    receiving: {
        type: Sequelize.DATEONLY
    },
    itemId: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER
}, {
    timestamps: false
});
/** @module purchase/model */
module.exports = { Purchase: purchaseSchema }