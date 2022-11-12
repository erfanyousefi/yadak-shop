const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    productType: {type: String, default: ""},
    image : {type : String, required : true},
    name : {type : String, required : true},
    brand : {type : String, default : undefined, required : true},
    volume : {type : Number, default : undefined},
    type : {type : String, default : ""},
    useFor : {type : [String], default : []},
    serialNumber : {type : String, default : undefined},
    madeIn : {type : String, default : ""},
    price : {type : Number, default : 0, required : true},
    text : {type : String, required : false},
    count : {type : Number, default : 0},
    saleCount: {type: Number, default: 0},
    off : {type : Number, default : 0},
}, {
    timestamps : true,
    versionKey : false
});
const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;