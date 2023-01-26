const { Router } = require("express");
const userController = require("../../http/controllers/admin/user/user.controller");
const router = Router();
/**
 * @swagger
 *  tags:
 *      name: Users
 *      description: tags of users
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          EditUser:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the name of user
 *                      example: user name
 *                  IdentityCard:
 *                      type: string
 *                      description: the IdentityCard of user
 */


/**
 * @swagger
 *  /admin/users:
 *      get:
 *          tags: [Users]
 *          summary: list of users
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/", userController.usersList);
/**
 * @swagger
 *  /admin/users/{id}:
 *      get:
 *          tags: [Users]
 *          summary: find one user with id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: the id of user for find it
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", userController.findOneUser);
/**
 * @swagger
 *  /admin/users/{id}:
 *      patch:
 *          tags: [Users]
 *          summary: edit user
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: the id of user for find it
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditUser'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditUser'
 *          responses:
 *              200:
 *                  description: success
 */
router.patch("/:id", userController.editUser);
module.exports = router;