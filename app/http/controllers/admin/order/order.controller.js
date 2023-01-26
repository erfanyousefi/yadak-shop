const moment = require("moment-jalaali")
const mongoose = require("mongoose")
const Controller = require("../../controller")
const productModel = require("./../../../../models/product")
const orderModel = require("./../../../../models/order");
const UserModel = require("../../../../models/user");
const {
    isValidObjectId
} = mongoose
module.exports = new class OrderController extends Controller {
    async getAllNewOrders(req, res, next){
        try{
            const orders = await orderModel.find({ status: "new" }).sort({_id : -1})
            return res.status(200).json({
                status : 200,
                success : true,
                orders
            })
        }catch(error){
            next(error)
        }
    }
    async getAllProcessOrders(req, res, next){
        try{
            const orders = await orderModel.find({ status: "status" }).sort({_id : -1})
            return res.status(200).json({
                status : 200,
                success : true,
                orders
            })
        }catch(error){
            next(error)
        }
    }
    async getAllDeliveredOrders(req, res, next){
        try{
            const orders = await orderModel.find({ status: "delivered" }).sort({_id : -1})
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
            const {username} = req.params;
            let {status} = req.query;
            const filter = {username}
            if(["new", "process", "delivered"].includes(status)) filter['status'] = status;
            const orders = await orderModel.find(filter).sort({_id : -1});
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

