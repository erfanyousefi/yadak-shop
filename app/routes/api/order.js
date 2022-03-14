import {Router} from "express";
import orderController from "../../http/controllers/api/order/order.controller.js";
const router = Router();
router.post("/", orderController.saveOrder)
export default router;