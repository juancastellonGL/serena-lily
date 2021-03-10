const { Model, connections } = require("../models");
const sequelize = connections.Sequelize;
const General = require("./general");

let itemService = {
    /**
     *creates or updates an item
     * @param {JSON} a json with the item values
     * @returns
     */
    createOrUpdate: itemData => {
        return new Promise((done, reject) => {
            General.alreadyExists(itemData.id, Model.Item).then(exists => {
                try {
                    if (exists === true) {
                        let query = `UPDATE items SET available = available + ${itemData.quantity}  WHERE id = ${itemData.id}`;
                        connections.query(query, { type: sequelize.QueryTypes.UPDATE }).then(() => {
                            done();
                        }).catch(err => {
                            return reject("there was an error updating the item", err);
                        });
                    } else {
                        Model.Item.create(itemData).then(item => {
                            done(item);
                        }).catch(err => {
                            return reject("there was an error creating the item", err);
                        });
                    }
                } catch (error) {
                    return reject("there was an error with the data", error);
                }
            })
        })
    }
}

/** @module item/service */
module.exports = itemService;