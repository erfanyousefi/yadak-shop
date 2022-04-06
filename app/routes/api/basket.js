const {Router}  = require("express");
const homeController = require("../../http/controllers/api/home.controller");
const router = Router();
router.post("/add-to-basket", homeController.addToCard)
router.post("/remove-from-basket", homeController.removeFromCard)
module.exports = router;