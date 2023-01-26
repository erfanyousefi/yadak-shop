const moment = require("moment-jalaali")
const mongoose = require("mongoose")
const Controller = require("../../controller")
const productModel = require("./../../../../models/product")
const Payfa = require('./../../../../modules/payfa');
const gateway = new Payfa('test');
const orderModel = require("./../../../../models/order");
const UserModel = require("../../../../models/user");
const {
    isValidObjectId
} = mongoose
module.exports = new class OrderController extends Controller {
    async saveOrder(req, res, next) {
        try {
            const {
                username,
                basket
            } = req.user;
            const {
                address,
                zipcode:zipCode,
                phone,
                province,
                city
            } = req.body;
            let originalPrice = 0,
                paymentAmount = 0,
                discount = 0,
                products = [],
                totalDiscount = 0,
                discountPrice = 0
            if(basket&& basket.length == 0) throw{status : 400, message : "سبد خرید خالی میباشد "}
            for (const product of basket) {
                const productID = isValidObjectId(product.product) ? product.product : null
                const productRecord = await productModel.findById(productID);
                productRecord.count = product.count
                products.push(productRecord);
                originalPrice = +productRecord.price * +product.count;
                discount = +productRecord?.off || 0;
                totalDiscount += +productRecord?.off || 0;
                let finalyPrice = originalPrice - ((discount / 100) * originalPrice)
                paymentAmount +=finalyPrice
            }
            let invoiceNumber = moment().format("YYYYMMDDHHmmssSSS") + String(process.hrtime()[1]).padStart(9, 0)
            const order = await orderModel.create({
                invoiceNumber,
                invoiceDate: moment().format("jYYYY/jMM/jDD - HH:mm:ss"),
                products,
                username,
                paymentAmount,
                originalPrice,
                totalDiscount,
                province,
                city,
                address,
                zipCode,
                phone,
                payment: false
            })
            // const callback_url = `${process.env.HOST}:${process.env.PORT}/order/verify`;
            // console.log(paymentAmount)
            // console.log(callback_url)
            // console.log(invoiceNumber)
            // gateway.send(+paymentAmount, callback_url, String(invoiceNumber)).then(link => {
            //     console.log(link)
            // })
            // .catch(error => res.end("<head><meta charset='utf8'></head>" + error));
            return res.redirect(`https://api.roghanicar.com/order/callback?iN=${invoiceNumber}`)
        } catch (error) {
            next(error)
        }
    }
    async paymentCallback(req, res, next){
        try{
            const {iN : invoiceNumber} = req.query;
            if(!invoiceNumber) throw{status: 400, message: "شماره فاکتور یافت نشد"}
            const order = await orderModel.findOne({invoiceNumber, payment : false, status: "new"});
            if(!order) throw{status : 400, message : "سفارش در انتظار پرداخت یافت نشد"}
            await orderModel.updateOne({invoiceNumber} , {payment : true, status: "success"});
            await UserModel.updateOne({username : order.username} , {basket : []});
            return res.status(201).json({
                status: 201,
                success : true,
                message : "پرداخت با موفقیت انجام شد  سفارش شما در  مرحله پردازش قرار گرفت"
            })
        }catch(error){
            next(error)
        }
    }
    async getAllOrders(req, res, next){
        try{
            const {username} = req.user;
            const orders = await orderModel.find({username}).sort({_id : -1})
            return res.status(200).json({
                status : 200,
                success : true,
                orders
            })
        }catch(error){
            next(error)
        }
    }
    async getOrdersWithStatus(req, res, next){
        try{
            const {username} = req.user
            const {status} = req.params;
            if(!["new", "process", "delivered"].includes(status)) throw {status : 200, message : "وضعیت مورد نظر وجود ندارد"}
            const orders = await orderModel.find({status, username}).sort({_id : -1})
            return res.status(200).json({
                status : 200,
                success : true,
                orders
            })
        }catch(error){
            next(error)
        }
    }
    async changeOrderStatus(req, res, next){
        try{
            const {id} = req.params;
            const {status} = req.body;
            if(!["new", "process", "delivered"].includes(status)) throw {status : 400, message : "وضعیت مورد نظر وجود ندارد"}
            const order = await orderModel.findOne({_id: id})
            if(!order) throw {status : 404, message : "سفارش مورد نظر وجود ندارد"}
            if(order?.status == "delivered") {
                throw {status: 400, message: "وضعیت تحویل داده شده غیر قابل تغییر میباشد"}
            }
            if(!(order?.status == "process" && status == "delivered")) {
                throw {status: 400, message: "وضعیت در حال پردازش تنها به تحویل داده شده قابل تغییر میباشد"}
            }
            if(!(order?.status == "new" && status == "process")) {
                throw {status: 400, message: "وضعیت جدید تنها به در حال پردازش  قابل تغییر میباشد"}
            }
            await orderModel.updateOne({_id: id}, {
                $set: {status}
            })
            return res.status(200).json({
                status : 200,
                success : true,
                message: "وضغیت سفارش با موفقیت تغییر پیدا کرد"
            })
        }catch(error){
            next(error)
        }
    }
}

