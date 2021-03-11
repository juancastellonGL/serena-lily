const { connections, Sequelize } = require("./sequelize");

/**
 * Represents a sale.
 * @constructor
 * @param {string} id
 * @param {int} quantity
 */
let saleSchema = connections.define("sales", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    created: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    itemId: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    dispatched: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});
/** @module sale/model */
module.exports = { Sale: saleSchema }