import blogController from "../../http/controllers/admin/blog/blog.controller.js";
import { Router } from "express";
import { upload } from "../../modules/upload-file.js";
import { insertBlog } from "../../http/validators/blog.js";
import apiErrorHandler from "../../http/middlewares/apiErrorHandler.js";
import ejsErrorHandler from "../../http/middlewares/ejsErrorHandler.js";
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
export default router;