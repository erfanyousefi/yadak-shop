import {Router} from "express";
import homeController from "../../http/controllers/api/home.controller.js";
const router = Router();
router.post("/add-to-basket", homeController.addToCard)
router.post("/remove-from-basket", homeController.removeFromCard)
export default router;