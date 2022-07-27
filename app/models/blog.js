const mongoose = require("mongoose")
const {model, Schema, Types} = mongoose;
const blogSchema = new Schema({
    title : {type : String, required : true},
    text : {type : String, required : true},
    images : {type : [String], default : []},
    suggest : {type : String, default : ""},
    pdf : {type : String, default : ""},
    // writer : {type : Types.ObjectId, required : true}
}, {timestamps : true})

const blogModel = model("blog", blogSchema);
module.exports = blogModel