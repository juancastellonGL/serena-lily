
let generalService = {
        /**
     *checks if an object already exists
     * @param {STRING} the object id
     * @param {Model} the Model from the object
     * @returns {Boolean} if the object exists in database or not
     */
    alreadyExists(id, model) {
        if (id) {
            return new Promise((done, reject) => {
                try {
                    let query = { where: { id: id  } };
                    query.attributes = ["id"];
                    model.findOne(query).then(model => {
                        if (model) {
                            done(true);
                        }
                        done(false);
                    });
                } catch (error) {
                    return reject(error);
                }
            });
        }
    }
}

/** @module general/service */
module.exports = generalService;