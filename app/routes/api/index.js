const { Router } = require("express")
const productRoutes = require("./product")
const blogRoutes = require("./blog")
const authRouter = require("./auth")
const basketRouter = require("./basket")
const orderRoutes = require("./order")
const { loginWithToken } = require("../../http/middlewares/checkAuth")
const router = Router();
router.use("/products", productRoutes);
router.use("/blogs", blogRoutes);
router.use("/auth", authRouter);
router.use("/basket",loginWithToken, basketRouter);
router.use("/order", orderRoutes);
module.exports = router