const { Router } = require("express")
const router = Router();
const adminRoutes = require("./admin/index")
const authRoutes = require("./admin/auth")
const ApiRoutes = require("./api/index")
router.use("/auth", authRoutes)
router.use((req, res, next) => {
    res.locals.layout = "layouts/master";
    next()
})
router.use("/admin", adminRoutes)
router.use("/", ApiRoutes)
module.exports = router;