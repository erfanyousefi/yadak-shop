import { Router } from "express";
import companyController from "../../http/controllers/admin/company/company.controller.js";
import errorHandler from "../../http/middlewares/apiErrorHandler.js";
import { insertCompanyValidator } from "../../http/validators/company.js";
import { uploadImageValidator } from "../../http/validators/image.js";
import { upload } from "../../modules/upload-file.js";
const router = Router();
router.get("/", companyController.comanyList);
router.get("/add", companyController.addCompanyForm)
router.post("/insert",insertCompanyValidator(), errorHandler, companyController.insertCompany)
router.get("/upload-logo/:id", companyController.uploadLogoCompanyForm)
router.post("/upload-logo/:id",upload.single("image"), companyController.uploadLogoCompany)
export default router;