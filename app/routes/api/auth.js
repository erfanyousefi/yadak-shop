import { Router } from "express";
import AuthController from "../../http/controllers/api/auth/auth.controller.js";
import apiErrorHandler from "../../http/middlewares/apiErrorHandler.js";
import { register } from "../../http/validators/auth.js";
const router = Router();
router.post("/register", register(), apiErrorHandler, AuthController.register)
router.post("/login", AuthController.login)
export default router;