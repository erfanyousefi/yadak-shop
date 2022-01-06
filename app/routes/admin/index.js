import express from "express";
import {
    Router
} from "express";
const router = Router();
import productRoutes from "./product.js"
import companyRoutes from "./company.js"
router.use("/product", productRoutes)
router.use("/company", companyRoutes)
router.get("/", async (req, res, next) => {
    res.status(200).render("./pages/admin/dashboard")
})
router.use(async (req, res, next) => {
    res.locals.layout = "layouts/errors/errorMaster";
    return res.status(404).render("./pages/admin/errors/404")
})
export default router;