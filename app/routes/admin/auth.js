import express from "express";
import {Router} from "express";
import authController from "../../http/controllers/admin/auth/auth.controller.js";
const router = Router();
router.use((req , res, next) => {
    res.locals.layout = "layouts/auth/authMaster";
    next()
})
router.get("/login", authController.loginForm)
router.get("/register", authController.loginForm)
// router.use(async(req, res, next) => {

//     return res.status(404).render("./pages/admin/errors/404")

// })
export default router;