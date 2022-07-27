const { Router } = require("express");
const AuthController = require("../../http/controllers/api/auth/auth.controller");
const apiErrorHandler = require("../../http/middlewares/apiErrorHandler");
const { getOtp, checkOtp } = require("../../http/validators/auth");
const router = Router();
/**
 * @swagger 
 *  tags:
 *      name: Authorization
 *      description: get and check otp 
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   username
 *              properties:
 *                  username:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                      example: 09332255768
  *          CheckOTP:
 *              type: object
 *              required:
 *                  -   username
 *                  -   code
 *              properties:
 *                  username:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                      example: 09332255768
 *                  code:
 *                      type: string
 *                      description: the user recived code for signup/signin
 */

/**
 * @swagger
 *  /auth/get-otp:
 *      post:
 *          tags: [Authorization]
 *          summary : get code from server for auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /auth/check-otp:
 *      post:
 *          tags: [Authorization]
 *          summary : check code from server for auth
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *          responses:
 *              200:
 *                  description: success
 */
router.post("/get-otp", getOtp(), apiErrorHandler, AuthController.getOtp)
router.post("/check-otp", checkOtp(), apiErrorHandler, AuthController.checkOtp)
module.exports =  router;