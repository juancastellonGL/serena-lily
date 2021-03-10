const { Model } = require("../models");
const General = require("./general");

let saleService = {
    /**
     *creates a new sale
     * @param {JSON} a json with the sale values
     * @returns
     */
    create: saleData => {
        return new Promise((done, reject) => {

            General.alreadyExists(saleData.id, Model.Sale).then(exists => {
                try {
                    if (exists === false) {
                        Model.Sale.create(saleData).then(sale => {
                             //TODO: add creating or update item functionality
                             done();
                        });
                    } else {
                        return reject("the sale already exists");
                    }
                } catch (error) {
                    return reject("there was an error creating the sale: ", error);
                }

            })
        })
    }, 

}

/** @module sale/service */
module.exports = saleService;