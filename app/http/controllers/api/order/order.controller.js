import moment from "moment-jalaali";
import mongoose from "mongoose";
import Controller from "../../controller.js";
import productModel from "./../../../../models/product.js"
import orderModel from "./../../../../models/order.js"
const {isValidObjectId} = mongoose
export default new class OrderController extends Controller{
    async saveOrder(req, res, next){
        try {
            const {username, basket} = req.user;
            const {address, zipCode, phone, province, city} = req.body;
            let originalPrice = 0, paymentAmount = 0, discount = 0, products = [], totalDiscount = 0;
            for (const product of basket) {
                const productID = isValidObjectId(product.product)? product.product : null
                const companyID = isValidObjectId(product.company)? product.company : null
                const productRecord = await productModel.findById(productID);
                products.push(productRecord);
                const prices = productRecord.prices;
                console.log((+prices.find(price => price.company == companyID).price) , (+product.count))
                originalPrice += (+prices.find(price => price.company == companyID).price) * (+product.count);
                discount = +productRecord?.off || 0;
                totalDiscount += +productRecord?.off || 0;
                paymentAmount += (discount / 100) * originalPrice;

            }
            await orderModel.create({
                invoiceNumber : moment().format("YYYYMMDDHHmmssSSS") + String(process.hrtime()[1]).padStart(9, 0),
                invoiceDate : moment().format("jYYYY/jMM/jDD - HH:mm:ss"),
                products, 
                username,
                paymentAmount,
                originalPrice,
                totalDiscount,
                province,
                city,
                address,
                zipCode,
                phone
            })
        } catch (error) {
            next(error)
        }
    }
}