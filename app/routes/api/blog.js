const { Router }  = require("express");
const blogController  = require("../../http/controllers/api/blog/blog.controller");
const router = Router();
router.get("/", blogController.blogs);
router.get("/:id", blogController.findBlogWithID);
module.exports =  router;