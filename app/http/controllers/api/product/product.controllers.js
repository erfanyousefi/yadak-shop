const { ObjectId } = require("mongodb")
const CompanyModel = require("../../../../models/company")
const ProductModel = require("../../../../models/product")
const Controller = require("../../controller")
module.exports =  new class ProductController extends Controller {
    async products(req, res, next) {
        try {
            const products = await ProductModel.aggregate([{
                $match: {}
            }, ])

            return res.status(200).json({
                status: 200,
                success: true,
                products
            })
        } catch (error) {
            next(error)
        }
    }
    async findProductWithSlug(req, res, next) {
        try {
            const {
                slug
            } = req.params;
            const product = await ProductModel.findOne({
                slug
            });
            if (!product) throw {
                status: 404,
                message: "محصولی یافت نشد"
            }
            return res.status(200).json({
                status: 200,
                success: true,
                product
            })
        } catch (error) {
            next(error)
        }
    }
    async productOfCompany(req, res, next) {
        try {
            const {
                companyID
            } = req.params;
            const products = await ProductModel.aggregate([
                {
                    $match: {
                        prices: {
                            $elemMatch: {
                                company: {
                                    $eq: ObjectId(companyID)
                                }
                            }
                        }
                    }
                }
            ]);
            if(!products.length > 0) throw {status : 404, message : "این کمپانی محصولی ندارد"}
            const prices = []
            for (const product of products) {
                for (const price of product.prices) {
                    if(price.company == companyID){
                        price.companyInfo = await CompanyModel.findOne({
                            _id: price.company
                        })
                        prices.push(price)
                    }
                }
                product.prices = [...prices]
            }
            return res.status(200).json({
                status : 200,
                success : true,
                products
            })
        } catch (error) {
            next(error)
        }
    }
    async findOneProduct(req, res, next){
        try{
            const {id} = req.params;
            const product = await ProductModel.findOne({_id : id});
            if(!product) throw {status : 404, message : "محصولی یافت نشد"}
            return res.status(200).json({
                status : 200,
                success : true,
                product
            })
        }catch(error){
            next(error)
        }
    }
}