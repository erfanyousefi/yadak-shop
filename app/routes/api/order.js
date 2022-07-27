const {Router} = require("express");
const orderController = require("../../http/controllers/api/order/order.controller");
const router = Router();
const { loginWithToken } = require("../../http/middlewares/checkAuth")
/**
 * @swagger
 *  tags:
 *      name: Order
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          AddOrder:
 *              type: object
 *              required:
 *                  -   province
 *                  -   city
 *                  -   address
 *                  -   zipcode
 *                  -   phone
 *              properties:
 *                  province:
 *                      type: string
 *                      example: Tehran
 *                      description: the province of buyer
 *                  city:
 *                      type: string
 *                      example: tehran
 *                      description: the city of buyer
 *                  address:
 *                      type: string
 *                      example: valie asr khiaban dovom koche shahid mahalati
 *                      description: the address of buyer
 *                  zipcode:
 *                      type: string
 *                      example: 4569871236
 *                      description: the zipcode or postalcode of buyer
 *                  phone:
 *                      type: string
 *                      example: 09332255768
 *                      description: the phone number of buyer
 *              
 */
/**
 * @swagger
 *  /order:
 *      post:
 *          tags: [Order]
 *          summary: create new order for user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddOrder'
 *          responses:
 *              201:
 *                  description: created
 */
router.post("/",loginWithToken, orderController.saveOrder)

router.get("/callback", orderController.paymentCallback)
/**
 * @swagger
 *  /order:
 *      get:
 *          tags: [Order]
 *          summary: get all orders of user
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/",loginWithToken, orderController.getOrdersWithStatus)
/**
 * @swagger
 *  /order/{status}:
 *      get:
 *          tags: [Order]
 *          summary: get orders of user by that status
 *          parameters : 
 *              -   in: path
 *                  name: status
 *                  schema:
 *                      type: string  
 *                      enum: 
 *                          -   success
 *                          -   pending
 *                          -   canceled
 *                          -   reject
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
 router.get("/:status",loginWithToken, orderController.getOrdersWithStatus)
 
module.exports = router;