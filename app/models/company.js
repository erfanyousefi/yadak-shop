const mongoose = require("mongoose")
const {Schema, model} = mongoose;
const companySchema = new Schema({
    fa_name : {type : String, default : undefined},
    en_name : {type : String, default : undefined},
    type : {type : String, default : undefined},
    logo : {type : String, default : undefined}
}, {versionKey : false});
const CompanyModel = model("company", companySchema);
module.exports = CompanyModel