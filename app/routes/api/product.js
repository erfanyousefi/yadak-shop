const { Router } = require("express");
const productControllers = require("../../http/controllers/api/product/product.controllers");
const { loginWithToken } = require("../../http/middlewares/checkAuth");
const router = Router();
/**
 * @swagger
 *  tags:
 *      name: Products
 *      description: tags of product
 */
/**
 * @swagger
 *  /products:
 *      get:
 *          tags: [Products]
 *          summary: list of products
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/", productControllers.products);
router.get("/company/:companyID", productControllers.productOfCompany);
/**
 * @swagger
 *  /products/slug/{slug}:
 *      get:
 *          tags: [Products]
 *          summary: find one product with slug
 *          parameters:
 *              -   in: path
 *                  name: slug
 *                  type: string
 *                  description: the slug of product title for find it
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/slug/:slug", productControllers.findProductWithSlug);
/**
 * @swagger
 *  /products/{id}:
 *      get:
 *          tags: [Products]
 *          summary: find one products with id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: the id of product for find it
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", productControllers.findOneProduct);
module.exports = router;