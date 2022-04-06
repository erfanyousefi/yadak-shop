const { Router } = require("express");
const productControllers = require("../../http/controllers/api/product/product.controllers");
const { loginWithToken } = require("../../http/middlewares/checkAuth");
const router = Router();
router.get("/", productControllers.products);
router.get("/company/:companyID", productControllers.productOfCompany);
router.get("/:id", productControllers.findOneProduct);
router.get("/:slug", productControllers.findProductWithSlug);
module.exports = router;