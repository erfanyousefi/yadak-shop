const express = require("express")
const {Router} = require("express")
const authController = require("../../http/controllers/admin/auth/auth.controller")
const router = Router();
router.use((req , res, next) => {
    res.locals.layout = "layouts/auth/authMaster";
    next()
})
router.get("/login", authController.loginForm)
router.get("/register", authController.loginForm)
module.exports = router;