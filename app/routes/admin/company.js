const { Router } = require("express")
const companyController = require("../../http/controllers/admin/company/company.controller")
const errorHandler = require("../../http/middlewares/apiErrorHandler")
const { insertCompanyValidator } = require("../../http/validators/company")
const { uploadImageValidator } = require("../../http/validators/image")
const { upload } = require("../../modules/upload-file")
const router = Router();
router.get("/", companyController.comanyList);
router.get("/add", companyController.addCompanyForm)
router.post("/insert",insertCompanyValidator(), errorHandler, companyController.insertCompany)
router.get("/upload-logo/:id", companyController.uploadLogoCompanyForm)
router.post("/upload-logo/:id",upload.single("image"), companyController.uploadLogoCompany)
module.exports = router;