const { connections, Sequelize } = require("./sequelize");

let saleSchema = connections.define("sales", {
    id: Sequelize.STRING,
    created: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
    },
    quantity: Sequelize.INTEGER
});

module.exports = { User: saleSchema }