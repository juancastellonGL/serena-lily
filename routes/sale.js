var express = require("express");
var router = express.Router();
const { Services } = require("../services");


/* POST new sale*/
router.post("/new", (req, res, next) => {
    Services.Sale.create({
        id: req.body.id,
        itemId: req.body.itemId,
        quantity: req.body.quantity
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(400);
    });
});

/* GET dispatch a sale*/
router.get("/dispatch", (req, res, next) => {
    Services.Sale.dispatch()
        .then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.error(err);
            res.sendStatus(400);
        });
});

router.get("/allocate", (req, res, next) => {
    Services.Sale.allocate()
        .then(sales => {
            res.json({sales});
        }).catch(err => {
            console.error(err);
            res.sendStatus(400);
        });
});



/** @module user/router */
module.exports = router;