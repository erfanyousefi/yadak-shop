import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title : {type : String, required : true},
    text : {type : String, required : true},
    image : {type : String, required : false},
    count : {type : Number, default : 0},
    serialNumber : {type : String, default : undefined},
    comments : {type : [Object], default : []},
    prices : {type : [Object], default : []},
    off : {type : String, default : "0"},
    supplier : {type : String, default : undefined},
    brand : {type : String, default : undefined},
    weight : {type : String , default : "0"},
    sizes : {type : Object, default : {height : "0", width : "0", length : "0"}},
    colors : {type : [String], default : []},
    cars : {type : String, default : ""},
    series : {type : String, default : undefined},
    category : {type : String, default : undefined},
    volume : {type : String, default : undefined},
    slug : {type : String, default : undefined},
}, {
    timestamps : true,
    versionKey : false
});
const ProductModel = mongoose.model("product", productSchema);
export default ProductModel;