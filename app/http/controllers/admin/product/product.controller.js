const Controller = require("../../controller")
const ProductService = require("./product.service")
const mongoose = require("mongoose")
const companyService = require("../company/company.service")
const CompanyModel = require("../../../../models/company")
const ProductModel = require("../../../../models/product")
const { ObjectId } = require("mongodb")
const { connectToCluster } = require("./../../../../modules/connectToDB")
let messages = {}, message = "";
module.exports = new class ProductController extends Controller{
    async productsList(req, res, next){
        try{
            const filters = {};
            const products = await ProductService.findProducts(filters)
            return res.status(200).json({
                statusCode: 200,
                data: {
                    products,
                }
            })
        }catch(error){
            next(error)
        }
    }
    async insertProduct(req, res, next){
        try {
            const {
                name,
                text,
                count,
                serialNumber,
                useFor,
                off,
                madeIn,
                volume,
                type,
                price,
                productType,
                brand,
            } = req.body;
            await ProductService.insertProduct({
                name,
                productType,
                text,
                count,
                serialNumber,
                off,
                useFor,
                brand,
                price,
                volume, //for oil's
                type, //for oil's
                madeIn, //for oil's
                image : this.getFileName(req.file)

            });
            return  res.status(201).json({
                statusCode: 201,
                message: "ثبت محصول با موفقیت انجام شد"
            });
        } catch (error) {
            next(error)
        }
    }
    async updateProduct(req, res, next){
        try {
            const {id} = req.params;
            const data = Object.assign({}, req.body);
            Object.keys(data).forEach(key => ([null, undefined, "", " "].includes(data[key])? delete data[key] : data[key]));
            await ProductService.updateProduct(id, data);
            return res.status(201).json({
                status : 201,
                success : true,
                message : "ویرایش محصول با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async removeProduct(req, res, next){
        try {
            const id = mongoose.isValidObjectId(req.params.id)? req.params.id : null;
            await ProductService.removeProduct(id);
            message = "حذف محصول با موفقیت انجام شد"
            return  res.redirect(req.headers.referer);
        } catch (error) {
            next(error)
        }
    }
    async findProducts(req, res, next){
        try {
            let filters = req.query || {};
            Object.keys(filters).forEach(key => !filters[key]? delete filters[key] : filters[key] = new RegExp(filters[key], "gim"));
            const products = await ProductService.findProducts(filters);
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
        try {
            const id = mongoose.isValidObjectId(req.params.id)? req.params.id : null;
            const product = await ProductService.findOneProduct(id);
            return res.status(200).json({
                status : 200,
                success : true,
                product
            })
        } catch (error) {
            next(error)
        }
    }
    async insertPrice(req, res, next){
        try{
            const {price, company, product_id} = req.body;
            console.log(req.body)
            const companyDocument = await ProductModel.findOne({"prices.company" : ObjectId(company), _id : ObjectId(product_id)});
            const product = await ProductModel.findById(product_id);
            mongoClient = await connectToCluster();
            const db = mongoClient.db(process.env.DB_NAME);
            const collection = db.collection('products');
            if(product){
                if(companyDocument){
                    const result = await collection.updateOne({"prices.company" : ObjectId(company), _id : ObjectId(product_id)}, {
                        $set : { "prices.$.price" : price}
                    })
                    console.log(JSON.stringify(result, null, 4));
                    
                }else{
                    const result = await collection.updateOne({_id : ObjectId(product_id)}, {
                        $push : { "prices" : {company : ObjectId(company), price}}
                    })
                    console.log(JSON.stringify(result, null, 4));
                }
                return res.status(201).json({
                    status : 201,
                    success :true,
                    message : "افزودن قیمت با موفقیت انجام شد"
                })
            }
            throw {status : 404, message : "محصولی یافت نشد"}
        }catch(error){
            next(error)
        }
    }
    async uploadImageProduct(req, res, next){
        try{
            const image = this.getFileName(req.file);
            const {id} = req.params;
            await ProductModel.updateOne({_id : id} , {$set : {image}}).catch(error => {
                this.removeFile(req.file)
            })
            return res.status(201).redirect("/admin/product")
        }catch(error){
            next(error)
        }
    }
    async getPrices(req, res, next){
        try{
            const {id} = req.params;
            const aggregate = [];
            aggregate.push({
                $match : {_id : {$eq : ObjectId(id)}}
            })
            aggregate.push({
                $project : {prices : 1}
            })
            aggregate.push({
                $lookup : {
                    from: "companies",
                    localField : "prices.company",
                    foreignField : "_id",
                    as : "list"
                }
            })
            aggregate.push({
                $addFields : {
                    "list.price" : {
                        $cond : {
                            if :  {$eq : ["$list._id", "$prices.company"]},
                            then : "$prices",
                            else : undefined
                        }
                    }
                }
            })
            aggregate.push({
                $project : {prices : 0}
            })
            const product = await collection.aggregate(aggregate).toArray();
            console.log(JSON.stringify(product, null, 4));
            
            return res.status(200).json({
                status : 200,
                success : true,
                ...product[0]
            })
        }catch(error){
            next(error)
        }
    }
}