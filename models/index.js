const { connections } = require("./sequelize");
/** @module models */
module.exports = {
    Model: {
    /*
     * Item model module.
     * @module item/model
     * @see module:item/model
     */
        ...require("./item"),
    /**
     * Purchase model module.
     * @module purchase/model
     * @see module:purchase/model
     */
        ...require("./purchase"),
    /**
     * Sale model module.
     * @module sale/model
     * @see module:sale/model
     */
        ...require("./sale")
    },
    connections
};