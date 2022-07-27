const {Router} =  require("express")
const productController =  require("../../http/controllers/admin/product/product.controller")
const errorHandler =  require("../../http/middlewares/apiErrorHandler")
const {insertPriceValidator, insertProductValidator} =  require("../../http/validators/product")
const {uploadImageValidator} =  require("../../http/validators/image")
const { upload } =  require("../../modules/upload-file")
const ejsErrorHandler = require("../../http/middlewares/ejsErrorHandler")
const router = Router();
router.get("/", productController.productUiDesign);
router.get("/add", productController.addProductForm);
router.get("/add-oil", productController.addOilProductForm);
router.get("/add-price/:id", productController.addPriceForm);
router.get("/get-prices/:id", productController.getPrices);
router.post("/insert",upload.single("image"), insertProductValidator(), ejsErrorHandler ,productController.insertProduct);
router.get("/edit-form/:id" ,productController.updateProductForm);
router.post("/update/:id" ,productController.updateProduct);
router.post("/insert-price", insertPriceValidator(), errorHandler ,productController.insertPrice);
router.get("/upload-image/:id" ,productController.uploadImageProductForm);
router.get("/remove/:id" ,productController.removeProduct);
router.post("/upload-image/:id",upload.single("image"), uploadImageValidator() ,productController.uploadImageProduct);
module.exports = router;