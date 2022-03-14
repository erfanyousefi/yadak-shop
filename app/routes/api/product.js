import { Router } from "express";
import productControllers from "../../http/controllers/api/product/product.controllers.js";
import { loginWithToken } from "../../http/middlewares/checkAuth.js";
const router = Router();
router.get("/",loginWithToken, productControllers.products);
router.get("/company/:companyID", productControllers.productOfCompany);
router.get("/:id", productControllers.findOneProduct);
router.get("/:slug", productControllers.findProductWithSlug);
export default router;