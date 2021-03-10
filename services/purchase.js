const { Model } = require("../models");
const Item = require("./item");
const General = require("./general");


let purchaseService = {
    /**
     *creates a new purchase
     * @param {JSON} a json with the purchase values
     * @returns
     */
    create: purchaseData => {
        return new Promise((done, reject) => {
            General.alreadyExists(purchaseData.id, Model.Purchase).then(exists => {
                try {
                    if (exists === false) {
                        Model.Purchase.create(purchaseData).then(purchase => {
                            done();
                        });
                    } else {
                        return reject("the purchase already exists");
                    }
                } catch (error) {
                    return reject("there was an error creating the purchase: ", error);
                }

            })
        })
    },
    /**
     *updates the quantity of the available items where a purchase is due to arrive
     * @param {STRING} currentDate
     * @returns
     */
    arrivals: (currentDate) => {
        return new Promise((done, reject) => {
            try {
                let query = { where: { receiving: currentDate } };
                query.attributes = ["id", "quantity", "itemId"];
                Model.Purchase.findAll(query).then(purchases => {
                    if (purchases) {
                        let updates = [];
                        for (const purchase of purchases) {
                            let itemId = purchase.itemId;
                            let quantity = purchase.quantity;
                            updates.push(Item.createOrUpdate({id: itemId, quantity: quantity}, true));
                        }
                        Promise.all(updates).then(()=> {
                            done();
                        }).catch(err=> {
                            return reject("there was an error with the arrival of an item: ", err);
                        });
                    }
                    done();
                });
            } catch (error) {
                return reject(error);
            }
        });
    }

}

/** @module item/service */
module.exports = purchaseService;