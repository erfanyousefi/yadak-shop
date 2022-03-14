import Controller from "../../controller.js";
import ProductService from "./product.service.js"
import mongoose from "mongoose";
import companyService from "../company/company.service.js";
import CompanyModel from "../../../../models/company.js";
import ProductModel from "../../../../models/product.js";
import { ObjectId } from "mongodb";
import { db } from "./../../../../modules/connectToDB.js";
import express from "express";
export default new class ProductController extends Controller{
    async productUiDesign(req, res, next){
        try{
            const filters = {};
            const products = await ProductService.findProducts(filters)
            return res.status(200).render("./pages/admin/product/products", {
                products
            })
        }catch(error){
            next(error)
        }
    }
    async addProductForm(req, res, next){
        try{
            const {category} = req.query;
            switch (category) {
                case "stock":
                    return res.status(200).render("./pages/admin/product/add-product")
                case "oil":
                    return res.status(200).render("./pages/admin/product/add-oil-product")
                case "filter":
                    return res.status(200).render("./pages/admin/product/add-filter-product")
                default:
                    return res.status(200).render("./pages/admin/product/add-product")
            }
            
        }catch(error){
            next(error)
        }
    }
    async addOilProductForm(req, res, next){
        try{
            return res.status(200).render("./pages/admin/product/add-oil-product")
        }catch(error){
            next(error)
        }
    }
    async addPriceForm(req, res, next){
        try {
            const {id} = req.params
            const product = await ProductModel.findOne({_id : id})
            if(!product) return res.redirect("/admin/product")
            console.log(product.category)
            const companies = await companyService.findCompanies({type : product.category})
            console.log(id);
            return res.status(200).render("pages/admin/product/add-price", {
                companies,
                product_id : id,
                req
            }) 
        } catch (error) {
            next(error)
        }
    }
    async insertProduct(req, res, next){
        try {
            const sizes = {
                length : req.body.length || "0",
                width : req.body?.width || "0",
                height : req.body?.height || "0"
            }
            const {
                title,
                text,
                count,
                serialnumber,
                off,
                weight,
                volume,
                type,
                cars,
                series,
                category,
            } = req.body;
            const slug = title.replace(/[\s\@\$\#\!\^\&\*\(\)\=\+\/]/gim, "-");
            console.log(req.body)
            await ProductService.insertProduct({
                title,
                slug,
                text,
                count,
                serialNumber : serialnumber,
                off,
                weight,
                series,
                sizes,
                volume, //for oil's
                type, //for oil's
                cars, //for oil's
                category, // for find category

            });
            return res.status(201).json({
                status : 201,
                success : true,
                message : "ثبت محصول با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async updateProduct(req, res, next){
        try {
            const {id} = req.params;
            const product = await ProductModel.findById(id)
            const category = req.body.category;
            const data =  {
                title : req.body.title,
                text : req.body.text,
                count : req.body.count,
                serialNumber : req.body.serialnumber,
                off : req.body.off,
                weight : req.body.weight,
                series : req.body.series,
            };
            if(data.title) data.slug = data.title.replace(/[\s\@\$\#\!\^\&\*\(\)\=\+\/]/gim, "-");
            switch (category) {
                case "oil":
                    data.volume = req.body.volume;
                    data.cars = req.body.cars;
                    break;
                case "filter":
                    data.cars = req.body.cars;
                    break;
                case "stock" :
                    const sizes = {
                        length : req.body.length || product.sizes.length,
                        width : req.body?.width || product.sizes.width,
                        height : req.body?.height || product.sizes.height
                    }
                    data.sizes = sizes
                    break;
                default:
                    break;
            }
            Object.keys(data).forEach(key => ([null, undefined, "", " ", "0"].includes(data[key])? delete data[key] : data[key]));
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
            const id = isValidObjectId(req.params.id)? req.params.id : null;
            await ProductService.removeProduct(id);
            return res.status(202).json({
                status : 202,
                success : true,
                message : "حذف محصول با موفقیت انجام شد"
            })
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
            if(product){
                if(companyDocument){
                    const result = await db.collection("products").updateOne({"prices.company" : ObjectId(company), _id : ObjectId(product_id)}, {
                        $set : { "prices.$.price" : price}
                    })
                    console.log(JSON.stringify(result, null, 4));
                    
                }else{
                    const result = await db.collection("products").updateOne({_id : ObjectId(product_id)}, {
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
    async uploadImageProductForm(req, res, next){
        try{
            const {id} = req.params
            return res.status(200).render("./pages/admin/product/upload-img", {
                product_id : id
            })
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
                    from : "companies",
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
            const product = await db.collection("products").aggregate(aggregate).toArray();
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
    async updateProductForm(req, res, next){
        try{
            const {id} = req.params;
            const product = await ProductModel.findById(id);
            return res.status(200).render("./pages/admin/product/edit-product", {
                product
            })
        }catch(error){
            next(error)
        }
    }
}