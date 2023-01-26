const {Router} = require("express");
const orderController = require("../../http/controllers/admin/order/order.controller");
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
 *          ChangeOrder:
 *              type: object
 *              required:
 *                  -   status
 *              properties:
 *                  status:
 *                      type: string
 *                      description: the status of order
 */

/**
 * @swagger
 *  /admin/order/:username:
 *      get:
 *          tags: [Order]
 *          summary: get all orders of user
 *          parameters : 
 *              -   in: path
 *                  name: username
 *              -   in: query
 *                  name: status
 *                  schema:
 *                      type: string  
 *                      enum: 
 *                          -   new
 *                          -   process
 *                          -   delivered
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:username",loginWithToken, orderController.getOrdersWithStatus)
/**
 * @swagger
 *  /admin/order/new:
 *      get:
 *          tags: [Order]
 *          summary: get new orders 
 *          responses:
 *              200:
 *                  description: success
 */
 router.get("/new",loginWithToken, orderController.getAllNewOrders)
/**
 * @swagger
 *  /admin/order/process:
 *      get:
 *          tags: [Order]
 *          summary: get process orders 
 *          responses:
 *              200:
 *                  description: success
 */
 router.get("/process",loginWithToken, orderController.getAllProcessOrders)
/**
 * @swagger
 *  /admin/order/delivered:
 *      get:
 *          tags: [Order]
 *          summary: get process orders 
 *          responses:
 *              200:
 *                  description: success
 */
 router.get("/delivered",loginWithToken, orderController.getAllDeliveredOrders)
/**
 * @swagger
 *  /admin/order/id:
 *      patch:
 *          tags: [Order]
 *          summary: get process orders 
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/ChangeOrder'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ChangeOrder'
 *          responses:
 *              200:
 *                  description: success
 */
 router.patch("/:id",loginWithToken ,orderController.changeOrderStatus)
 
module.exports = router;