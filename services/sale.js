const { Model } = require("../models");
const Item = require("./item")
const General = require("./general");
const { availability } = require("./item");

let saleService = {
    /**
     *creates a new sale
     * @param {JSON} a json with the sale values
     * @returns
     */
    create: saleData => {
        return new Promise((done, reject) => {
            Item.availability(saleData.itemId).then(availability => {
                if(availability >= saleData.quantity){
                    General.alreadyExists(saleData.id, Model.Sale).then(exists => {
                        try {
                            if (exists === false) {
                                Model.Sale.create(saleData).then(sale => {
                                    sale.quantity = -sale.quantity;
                                    Item.createOrUpdate(sale).then(()=>{
                                        done();
                                    }).catch(err => {
                                        return reject("there was an error while updating the stock quantity: ",err);
                                    });
                                    
                                });
                            } else {
                                return reject("the sale already exists");
                            }
                        } catch (error) {
                            return reject("there was an error creating the sale: ", error);
                        }
                    });
                }else{
                    return reject("there isn't enough items to sell");
                }
            });
        });
    },

}

/** @module sale/service */
module.exports = saleService;