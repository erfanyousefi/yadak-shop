
const {
    Router
} = require("express")
const router = Router();
const productRoutes = require("./product")
const companyRoutes = require("./company")
const blogRoutes = require("./blog")
router.use("/product", productRoutes)
router.use("/company", companyRoutes)
router.use("/blog", blogRoutes)
router.get("/", async (req, res, next) => {
    res.status(200).render("./pages/admin/dashboard")
})
router.use(async (req, res, next) => {
    res.locals.layout = "layouts/errors/errorMaster";
    return res.status(404).render("./pages/admin/errors/404")
})
module.exports = router;