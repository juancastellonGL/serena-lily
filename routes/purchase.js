var express = require("express");
var router = express.Router();
const { Services } = require("../services");


/* POST new purchase*/
router.post("/new", (req, res, next) => {
    Services.Purchase.create({
        id: req.body.id,
        receiving: req.body.receiving,
        itemId: req.body.itemId,
        quantity: req.body.quantity
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(400);
    });
});

/* POST receive stock*/
router.post("/arrivals", (req, res, next) => {
    Services.Purchase.arrivals(
        req.body.currentDate
    ).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(400);
    });
});

/** @module user/router */
module.exports = router;