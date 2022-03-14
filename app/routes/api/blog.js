import { Router } from "express";
import blogController from "../../http/controllers/api/blog/blog.controller.js";
const router = Router();
router.get("/", blogController.blogs);
router.get("/:id", blogController.findBlogWithID);
export default router;