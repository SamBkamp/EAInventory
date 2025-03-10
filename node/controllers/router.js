const express = require("express");
const router = express.Router();
const logic = require("./logic.js");

router.get("/erm", logic.erm);
router.post('/:dash?/get-tanks', logic.getTanks);
router.post('/:dash?/get-orders', logic.getOrders);
router.post('/:dash?/get-send', logic.getSend);
router.post('/:dash?/get-products', logic.getProducts);
router.post("/:dash?/get-fmprod", logic.getFmProducts);
router.post("/:dash?/add-order", logic.addOrder);
router.get("/dash", logic.dash);
router.get("/sent", logic.sent);
router.get("/orders/", logic.orders);
router.get("/", logic.root);
router.post("/p/login", logic.login);
router.post("/updateStock", logic.updateFmStock);
router.get("/fm", logic.fm);

module.exports = router;
