
const {
    Router
} = require("express")
const router = Router();
const productRoutes = require("./product")
const companyRoutes = require("./company")
const blogRoutes = require("./blog")
router.use("/product", productRoutes)
// router.use("/company", companyRoutes)
router.use("/blog", blogRoutes)
module.exports = router;