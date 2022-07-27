const {Router}  = require("express");
const homeController = require("../../http/controllers/api/home.controller");
const router = Router();
/**
 * @swagger
 *  tags:
 *      name: BasketOfProducts
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddToBasket:
 *              type: object
 *              required:
 *                  -   product
 *              properties:
 *                  product:
 *                      type: string
 *                      description: the id of product
 *                      placeholder: ProductID
 */
/**
 * @swagger
 *  /basket/add-to-basket:
 *      post:
 *          tags: [BasketOfProducts]
 *          summary: add  product to basket 
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddToBasket'
 *          responses:
 *              201:
 *                  description: created
 */
router.post("/add-to-basket", homeController.addToCard)
/**
 * @swagger
 *  /basket/remove-from-basket:
 *      post:
 *          tags: [BasketOfProducts]
 *          summary: remove  product from basket 
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddToBasket'
 *          responses:
 *              201:
 *                  description: created
 */
router.post("/remove-from-basket", homeController.removeFromCard)
router.get("/", homeController.getBasket)
module.exports = router;