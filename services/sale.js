const { Model } = require("../models");
const Item = require("./item")
const General = require("./general");
const { availability, itemList } = require("./item");

let saleService = {
    /**
     *creates a new sale
     * @param {JSON} a json with the sale values
     * @returns
     */
    create: saleData => {
        return new Promise((done, reject) => {
            Item.availability(saleData.itemId).then(availability => {
                General.alreadyExists(saleData.id, Model.Sale).then(exists => {
                    try {
                        if (exists === false) {
                            if (availability < saleData.quantity) {
                                saleData.dispatched = false;
                            }
                            Model.Sale.create(saleData).then(sale => {
                                if (sale.dispatched === true) {
                                    Item.createOrUpdate({id: sale.itemId, available: -sale.quantity}).then(() => {
                                        done(sale);
                                    }).catch(err => {
                                        return reject("there was an error while updating the stock quantity: ", err);
                                    });
                                }else{
                                    done(sale);
                                }
                            });
                        } else {
                            return reject("the sale already exists");
                        }
                    } catch (error) {
                        return reject("there was an error creating the sale: ", error);
                    }
                });
            });
        });
    },
    /**
     *updates pending sales dispatch status
     * @param {STRING} sale id
     * @returns
     */
    updateStatus: (id) => {
        return new Promise((done, reject) => {
            Model.Sale.update({ dispatched: true }, { where: { id: id } })
                .then(() => { done() })
                .catch(err => {
                    return reject("there was an error updating the status: ", err);
                });
        });
    },
    /**
     *dispatches pending sales
     * @param 
     * @returns
     */
    dispatch: () => {
        return new Promise((done, reject) => {
            let salesUpdates = [];
            let itemUpdates = [];
            let query = { where: { dispatched: false } };
            query.attributes = ["id", "quantity", "itemId", "dispatched"];
            Model.Sale.findAll(query).then(sales => {
                let itemsId = sales.map(sale => sale.itemId);
                Item.itemList(itemsId).then(items => {
                    for (const sale of sales) {
                        let itemId = sale.itemId;
                        items.forEach(item => {
                            if (itemId === item.id) {
                                if (sale.quantity >= item.available) {
                                    sale.dispatched = true;
                                    itemUpdates.push(Item.createOrUpdate({id: item.id, available: -sale.quantity}));
                                }
                            }
                        });
                        salesUpdates.push(saleService.updateStatus(sale.id));
                    }
                });
            });
            Promise.all(itemUpdates).then(() => {
                Promise.all(salesUpdates).then(() => {
                    done();
                }).catch(err => {
                    return reject("there was an error while updating the sales: ", err);
                })
            }).catch(err => {
                return reject("there was an errror while updating the item list: ", err);
            });
        });
    },

    /**
     *return an Array of sales
     * @param {JSON} a json with the sale values
     * @returns
     */
    allocate: () => {
        return new Promise((done, reject) => {
            let query = {};
            query.attributes = ["id", "created"];
            Model.Sale.findAll(query).then(sales => {
                done(sales);
            });
        });
    }
}

/** @module sale/service */
module.exports = saleService;