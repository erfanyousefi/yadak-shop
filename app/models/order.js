const mongoose = require("mongoose")
const {Types, Schema, model} = mongoose;
const OrderSchema = new Schema({
    username : {type : String, required : true},
    products : {type : [Object], required : true},
    originalPrice : {type : String, required : true},
    totalDiscount : {type : String, default : "0"},
    paymentAmount : {type : String, required : true},
    address : {type : String, required : true},
    tref : {type : String, default : ""},
    invoiceNumber : {type : String, required : true},
    invoiceDate : {type : String, required : true},
    status : {type : String, default : "pending"}, //in-process, sending - reciving ,
    province : {type : String, required : true},
    city : {type : String, required : true},
    address : {type : String, required : true},
    zipCode : {type : String, required : true},
    phone : {type : String, required : true},
    payment : {type: Boolean, required: true, default: false}
}, {timestamps : true})
module.exports = model("order", OrderSchema)
