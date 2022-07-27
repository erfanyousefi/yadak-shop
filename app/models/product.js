const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name : {type : String, required : true},
    brand : {type : String, default : undefined, required : true},
    image : {type : String, required : true},
    count : {type : Number, default : 0},
    serialNumber : {type : String, default : undefined},
    price : {type : Number, default : 0, required : true},
    volume : {type : String, default : undefined},
    slug : {type : String, default : undefined},
    off : {type : String, default : "0"},
    text : {type : String, required : false},
    useFor : {type : String, default : ""},
    madeIn : {type : String, default : ""},
    type : {type : String, default : ""},
}, {
    timestamps : true,
    versionKey : false
});
const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;