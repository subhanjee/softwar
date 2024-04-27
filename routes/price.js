const express = require("express");
const router = express.Router();
const price = require("../controller/price");

//create a new price
router.post("/", price.createPriceCtrl);

//  fetch all prices
router.get("/", price.getAllPricesCtrl);

//  single price by ID
router.get("/:id", price.getPriceByIdCtrl);

// price by ID
router.patch("/:id", price.updatePriceByIdCtrl);

// delete a price by ID
router.delete("/:id", price.deletePriceByIDCtrl);

module.exports = router;
