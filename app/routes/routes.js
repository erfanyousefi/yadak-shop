import { Router } from "express";
const router = Router();
import adminRoutes from "./admin/index.js"
import authRoutes from "./admin/auth.js"
import ApiRoutes from "./api/index.js"
router.use("/auth", authRoutes)
router.use((req, res, next) => {
    res.locals.layout = "layouts/master";
    next()
})
router.use("/admin", adminRoutes)
router.use("/", ApiRoutes)
export default router;