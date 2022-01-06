import { Router } from "express";
import companyController from "../../http/controllers/admin/company/company.controller.js";
import errorHandler from "../../http/middlewares/apiErrorHandler.js";
import { insertCompanyValidator } from "../../http/validators/company.js";
const router = Router();
router.get("/", companyController.comanyList);
router.get("/add", companyController.addCompanyForm)
router.post("/insert",insertCompanyValidator(), errorHandler, companyController.insertCompany)
export default router;