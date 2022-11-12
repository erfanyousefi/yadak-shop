const blogController = require("../../http/controllers/admin/blog/blog.controller");
const { Router } = require("express");
const { upload } = require("../../modules/upload-file");
const { insertBlog } = require("../../http/validators/blog");
const apiErrorHandler = require("../../http/middlewares/apiErrorHandler");
const ejsErrorHandler = require("../../http/middlewares/ejsErrorHandler");
const router = Router();
/**
 * @swagger 
 *  tags:
 *      name: AdminBlogApi
 *      description: Admin - Blog
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          InsertBlog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   suggest
 *                  -   images
 *                  -   pdf
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                      example: roghan 4000
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                      example: description of blog
 *                  suggest:
 *                      type: string
 *                      description: the suggest of blog
 *                      example: some suggest....
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: bunary
 *                  pdf: 
 *                      type: string
 *                      format: binary
 *          EditBlog:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                      example: roghan 4000
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                      example: description of blog
 *                  suggest:
 *                      type: string
 *                      description: the suggest of blog
 *                      example: some suggest....
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: bunary
 *                  pdf: 
 *                      type: string
 *                      format: binary
 */
/**
 * @swagger
 *  /admin/blog/list:
 *      get:
 *          tags: [AdminBlogApi]
 *          summary: get list of blogs
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/blog/{id}:
 *      get:
 *          tags: [AdminBlogApi]
 *          summary: get list of blogs
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/blog/insert:
 *      post:
 *          tags: [AdminBlogApi]
 *          summary : create new blog
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/InsertBlog'
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/blog/update/{id}:
 *      post:
 *          tags: [AdminBlogApi]
 *          summary : edit blog
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/EditBlog'
 *          responses:
 *              200:
 *                  description: success
 */



router.get("/list", blogController.blogs);
router.get("/:id", blogController.blogs);
router.post("/insert", upload.fields([
    {name : "pdf", maxCount : 1},
    {name : "images", maxCount : 3},
]),insertBlog(), blogController.insertBlog)
router.post("/update/:id", upload.fields([
    {name : "pdf", maxCount : 1},
    {name : "images", maxCount : 3},
]),insertBlog(), blogController.updateBlog)
module.exports = router;