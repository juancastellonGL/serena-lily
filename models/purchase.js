const { connections, Sequelize } = require("./sequelize");

let purchaseSchema = connections.define("purchases", {
    id: Sequelize.STRING,
    created: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    quantity: Sequelize.INTEGER
});

module.exports = { User: purchaseSchema }