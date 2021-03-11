const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const { Services } = require("../services");
const { Model } = require("../models");

describe("Purchase services", function () {
    describe("new purchase", function () {
        it("Should create a new purchase on the database", function (done) {
            Services.Purchase.create({ id: "p1", receiving: "2021-03-11", itemId: "1", quantity: "10" })
                .then(function (purchase) {
                    purchase.dataValues.should.have.property("id");
                    purchase.dataValues.id.should.equal("p1");
                    purchase.dataValues.should.have.property("receiving");
                    purchase.dataValues.receiving.should.equal("2021-03-11");
                    purchase.dataValues.should.have.property("itemId");
                    purchase.dataValues.itemId.should.equal("1");
                    purchase.dataValues.should.have.property("quantity");
                    purchase.dataValues.quantity.should.equal("10");
                    done();
                }).catch(function (err) {
                    should.not.exist(err);
                    done();
                });
        });
    });
    describe("existing purchase", function () {
        it("Should not create an existing purchase twice", function (done) {
            Services.Purchase.create({ id: "p1", receiving: "2021-03-11", itemId: "1", quantity: "10" })
                .then(function (purchase) { done(); }).catch(function (err) {
                    err.should.equal("the purchase already exists");
                    done();
                });
        });
    });
    describe("new arrivals", function () {
        it("Should update the item on the database", function (done) {
            Services.Purchase.arrivals("2021-03-11")
                .then(function () {
                    let query = { where: { id: "1" } };
                    query.attributes = ["id", "available"];
                    query.raw = true;
                    Model.Item.findOne(query).then(function (item) {
                        item.should.have.property("id");
                        item.id.should.equal(1);
                        item.available.should.equal(10);
                        done();
                    });
                }).catch(function (err) {
                    should.not.exist(err);
                    done();
                });
        });
    });
});

describe("Sale services", function () {
    describe("new sale", function () {
        it("Should create a new sale on the database", function (done) {
            Services.Sale.create({ id: "s1", itemId: "1", quantity: "50" })
                .then(function (sale) {
                    sale.dataValues.should.have.property("id");
                    sale.dataValues.id.should.equal("s1");
                    done();
                }).catch(function (err) {
                    should.not.exist(err);
                    done();
                });
        });
    });
    describe("existing sale", function () {
        it("Should not create an existing sale twice", function (done) {
            Services.Sale.create({ id: "s1", itemId: "1", quantity: "50" })
                .then(function (sale) { done(); }).catch(function (err) {
                    err.should.equal("the sale already exists");
                    done();
                });
        });
    });
    describe("dispatching", function () {
        it("Should update the item on the database", function (done) {
            Services.Item.createOrUpdate({ id: "1", available: "40" }).then(function () {
                Services.Sale.dispatch()
                    .then(function () {
                        let query = { where: { id: "1" } };
                        query.attributes = ["id", "available"];
                        query.raw = true;
                        setTimeout(function () {
                            Model.Item.findOne(query).then(function (item) {
                                console.log("this is the item: ", item);
                                item.should.have.property("id");
                                item.id.should.equal(1);
                                item.available.should.equal(0);
                                done();
                            });
                        }, 1000);
                    }).catch(function (err) {
                        should.not.exist(err);
                        done();
                    });
            });
        });
    });

});