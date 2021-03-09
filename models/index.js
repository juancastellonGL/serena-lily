const { connections } = require("./sequelize");
module.exports = {
  Model: {
    ...require("./item"),
    ...require("./purchase"),
    ...require("./sale")
  },
  connections
};