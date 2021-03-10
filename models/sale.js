const { connections, Sequelize } = require("./sequelize");

/**
 * Represents a sale.
 * @constructor
 * @param {string} id
 * @param {int} quantity
 */
let saleSchema = connections.define("sales", {
    id: Sequelize.STRING,
    created: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    itemId: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    dispatched: Sequelize.BOOLEAN
});
/** @module sale/model */
module.exports = { Sale: saleSchema }