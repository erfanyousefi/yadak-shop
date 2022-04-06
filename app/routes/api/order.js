const {Router} = require("express");
const orderController = require("../../http/controllers/api/order/order.controller");
const router = Router();
router.post("/", orderController.saveOrder)
module.exports = router;