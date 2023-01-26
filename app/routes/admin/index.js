
const { Router } = require("express")
const router = Router();
const userRoutes = require("./user")
const orderRoutes = require("./order")
const productRoutes = require("./product")
const blogRoutes = require("./blog")
router.use("/users", userRoutes)
router.use("/order", orderRoutes)
router.use("/product", productRoutes)
router.use("/blog", blogRoutes)
module.exports = router;