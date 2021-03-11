const { Model, connections } = require("../models");
const sequelize = connections.Sequelize;
const General = require("./general");
const Op = sequelize.Op;

let itemService = {
    /**
     *creates or updates an item
     * @param {JSON} a json with the item values
     * @returns
     */
    createOrUpdate: (itemData, isAPurchase = false) => {
        return new Promise((done, reject) => {
            General.alreadyExists(itemData.id, Model.Item).then(exists => {
                try {
                    if (exists === true) {
                        let query = `UPDATE items SET available = available + ${itemData.available}  WHERE id = ${itemData.id}`;
                        connections.query(query, { type: sequelize.QueryTypes.UPDATE }).then(() => {
                            done();
                        }).catch(err => {
                            return reject("there was an error updating the item", err);
                        });
                    } else if (isAPurchase === true) {
                        Model.Item.create({id: itemData.id, available: itemData.available}).then(item => {
                            done(item);
                        }).catch(err => {
                            return reject("there was an error creating the item", err);
                        });
                    } else {
                        return reject("the item does not exists");
                    }
                } catch (error) {
                    return reject("there was an error with the data", error);
                }
            })
        })
    },
    /**
     *checks the availability of an item
     * @param {INT} item id
     * @returns {INT} item quantity
     */
    availability: id => {
        if (id) {
            return new Promise((done, reject) => {
                try {
                    let query = { where: { id: id } };
                    query.attributes = ["id", "available"];
                    Model.Item.findOne(query).then(item => {
                        if (item) {
                            done(item.available);
                        } else {
                            return reject("the item does not exists");
                        }
                    });
                } catch (error) {
                    return reject(error);
                }
            });
        }
    },
    /**
     *brings a list of items
     * @param {array} array of items id
     * @returns {array} array of items 
     */
    itemList: (itemsIds) => {
        return new Promise((done, reject) => {
            let query = {
                where: {
                    id: {
                        [Op.or]: [itemsIds]
                    }
                }
            };
            query.attributes = ["id", "available"];
            Model.Item.findAll(query).then(items => {
                done(items);
            }).catch(err => {
                return reject("there was an error searching for the items: ", err)
            })
        });
    }
}

/** @module item/service */
module.exports = itemService;