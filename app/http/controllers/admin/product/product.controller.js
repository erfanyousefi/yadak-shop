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
            return res.status(200).render("./pages/admin/product/add-product")
        }catch(error){
            next(error)
        }
    }
    async addPriceForm(req, res, next){
        try {
            const companies = await companyService.findCompanies()
            const {id} = req.params
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
                height : req.body?.heigth || "0"
            }
            const {
                title,
                text,
                count,
                serialNumber,
                price,
                off,
                supplier,
                brand,
                logo,
                weight,
                grade,
                madeIn,
                madeDate,
                series,
                colors
            } = req.body;
            console.log(req.body)
            await ProductService.insertProduct({
                title,
                text,
                count,
                serialNumber,
                price,
                off,
                supplier,
                brand,
                weight,
                grade,
                madeIn,
                series,
                sizes,
                colors
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
            const data =  {
                title : req.body.title,
                text : req.body.text,
                count : req.body.count,
                serialNumber : req.body.serialNumber,
                price : req.body.price,
                off : req.body.off,
                supplier : req.body.supplier,
                brand : req.body.brand,
                logo : req.body.logo,
                weight : req.body.weight,
                grade : req.body.grade,
                madeIn : req.body.madeIn,
                madeDate : req.body.madeDate,
                series : req.body.series,
                sizes : req.body.sizes,
                colors : req.body.colors
            };
            Object.keys(data).forEach(key => (!data[key])? delete data[key] : data[key]);
            await ProductService.updateProduct(data);
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
}