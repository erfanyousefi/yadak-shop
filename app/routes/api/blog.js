const { Router }  = require("express");
const blogController  = require("../../http/controllers/api/blog/blog.controller");
const router = Router();
/**
 * @swagger
 *  tags:
 *      name: BlogApi
 *      description: blog sections 
 */
/**
 * @swagger
 *  /blogs:
 *      get:
 *          tags: [BlogApi]
 *          summary: get list of blogs
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/", blogController.blogs);
/**
 * @swagger
 *  /blogs/{id}:
 *      get:
 *          tags: [BlogApi]
 *          summary: get list of blogs
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/:id", blogController.findBlogWithID);
module.exports =  router;