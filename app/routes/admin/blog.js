const blogController = require("../../http/controllers/admin/blog/blog.controller");
const { Router } = require("express");
const { upload } = require("../../modules/upload-file");
const { insertBlog } = require("../../http/validators/blog");
const apiErrorHandler = require("../../http/middlewares/apiErrorHandler");
const ejsErrorHandler = require("../../http/middlewares/ejsErrorHandler");
const router = Router();
router.get("/", blogController.blogs);
router.get("/add", blogController.insertBlogForm);
router.get("/edit-form/:id", blogController.editBlogForm);
router.post("/insert", upload.fields([
    {name : "pdf", maxCount : 1},
    {name : "images", maxCount : 3},
]),insertBlog(), ejsErrorHandler, blogController.insertBlog)
router.post("/update/:id", upload.fields([
    {name : "pdf", maxCount : 1},
    {name : "images", maxCount : 3},
]),insertBlog(), blogController.updateBlog)
module.exports = router;