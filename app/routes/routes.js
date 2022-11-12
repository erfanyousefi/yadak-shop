const { Router } = require("express")
const router = Router();
const adminRoutes = require("./admin/index")
const ApiRoutes = require("./api/index");
const { checkAdmin } = require("../http/middlewares/checkRole");
const { loginWithToken } = require("../http/middlewares/checkAuth");
router.use("/admin", loginWithToken, checkAdmin, adminRoutes)
router.use("/", ApiRoutes)
module.exports = router;