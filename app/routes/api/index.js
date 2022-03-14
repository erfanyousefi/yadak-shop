import { Router } from "express";
import productRoutes from "./product.js"
import blogRoutes from "./blog.js"
import authRouter from "./auth.js"
import basketRouter from "./basket.js"
import orderRoutes from "./order.js"
import { loginWithToken } from "../../http/middlewares/checkAuth.js";
const router = Router();
router.use("/products", productRoutes);
router.use("/blogs", blogRoutes);
router.use("/auth", authRouter);
router.use(loginWithToken)
router.use("/basket", basketRouter);
router.use("/order", orderRoutes);
export default router