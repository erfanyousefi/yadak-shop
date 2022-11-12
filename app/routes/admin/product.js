const {Router} =  require("express")
const productController =  require("../../http/controllers/admin/product/product.controller")
const errorHandler =  require("../../http/middlewares/apiErrorHandler")
const {insertPriceValidator, insertProductValidator} =  require("../../http/validators/product")
const {uploadImageValidator} =  require("../../http/validators/image")
const { upload } =  require("../../modules/upload-file")
const ejsErrorHandler = require("../../http/middlewares/ejsErrorHandler")
const { stringToArray } = require("../../modules/stringToArray")
const router = Router();
/**
 * @swagger 
 *  tags:
 *      name: AdminProductApi
 *      description: Admin - Product
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          InsertProduct:
 *              type: object
 *              required:
 *                  -   name
 *                  -   text
 *                  -   productType
 *                  -   count
 *                  -   serialNumber
 *                  -   image
 *                  -   price
 *                  -   brand
 *                  -   useFor
 *                  -   madeIn
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the name of product
 *                      example: product name
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                      example: description of product
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                      example: 20
 *                  productType:
 *                      type: string
 *                      description: the type of product
 *                      example: oil filter
 *                  image:
 *                      type: string
 *                      format: binary
 *                  brand: 
 *                      type: string
 *                      description: brand of product
 *                      example: france
 *                  serialNumber: 
 *                      type: string
 *                      description: serialnumber of product
 *                      example: 14556677-233-21
 *                  price: 
 *                      type: string
 *                      description: price of product
 *                      example: 2400000
 *                  useFor: 
 *                      type: array
 *                      items:
 *                          type: string
 *                  off: 
 *                      type: string
 *                      description: off of product
 *                      example: 50
 *                  type: 
 *                      type: string
 *                      description: type of product
 *                      example: pride
 *                  madeIn: 
 *                      type: string
 *                      description: madeIn of product
 *                      example: japon
 *          EditProduct:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the name of product
 *                      example: product name
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                      example: description of product
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                      example: 20
 *                  productType:
 *                      type: string
 *                      description: the type of product
 *                      example: oil filter
 *                  image:
 *                      type: string
 *                      format: binary
 *                  brand: 
 *                      type: string
 *                      description: brand of product
 *                      example: france
 *                  serialnumber: 
 *                      type: string
 *                      description: serialnumber of product
 *                      example: 14556677-233-21
 *                  price: 
 *                      type: string
 *                      description: price of product
 *                      example: 2400000
 *                  useFor: 
 *                      type: array
 *                      items:
 *                          type: string
 *                  off: 
 *                      type: string
 *                      description: off of product
 *                      example: 50
 *                  type: 
 *                      type: string
 *                      description: type of product
 *                      example: pride
 *                  madeIn: 
 *                      type: string
 *                      description: madeIn of product
 *                      example: japon
 */
/**
 * @swagger
 *  /admin/product/list:
 *      get:
 *          tags: [AdminProductApi]
 *          summary: get list of products
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/product/{id}:
 *      get:
 *          tags: [AdminProductApi]
 *          summary: get list of products
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/product/insert:
 *      post:
 *          tags: [AdminProductApi]
 *          summary : create new product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/InsertProduct'
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/product/update/{id}:
 *      post:
 *          tags: [AdminProductApi]
 *          summary : edit product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/EditProduct'
 *          responses:
 *              200:
 *                  description: success
 */

router.get("/list", productController.productsList);
router.post("/insert",upload.single("image"), stringToArray("useFor"), productController.insertProduct);
router.post("/update/:id",upload.single("image"), stringToArray("useFor") ,productController.updateProduct);
router.post("/insert-price" ,productController.insertPrice);
router.get("/remove/:id" ,productController.removeProduct);
router.post("/upload-image/:id",upload.single("image") ,productController.uploadImageProduct);
module.exports = router;