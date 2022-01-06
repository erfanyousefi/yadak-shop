import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title : {type : String, required : true},
    text : {type : String, required : true},
    images : {type : [String], required : true},
    count : {type : Number, default : 0},
    serialNumber : {type : String, default : undefined},
    comments : {type : [Object], default : []},
    prices : {type : [Object], default : []},
    off : {type : String, default : "0"},
    supplier : {type : String, default : undefined},
    brand : {type : String, default : undefined},
    logo : {type : String, default : undefined},
    weight : {type : String , default : "0"},
    sizes : {type : [Object], default : {height : "0", width : "0", length : "0"}},
    colors : {type : [String], default : []},
    grade : {type : String, default : undefined},
    madeIn : {type : String, default : "iran"},
    series : {type : String, default : undefined},
    madeDate : {type : String, default : undefined}
}, {
    timestamps : true,
    versionKey : false
});
const ProductModel = mongoose.model("product", productSchema);
export default ProductModel;