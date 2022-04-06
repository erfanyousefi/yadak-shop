const { Router } = require("express");
const AuthController = require("../../http/controllers/api/auth/auth.controller");
const apiErrorHandler = require("../../http/middlewares/apiErrorHandler");
const { register } = require("../../http/validators/auth");
const router = Router();
router.post("/register", register(), apiErrorHandler, AuthController.register)
router.post("/login", AuthController.login)
module.exports =  router;