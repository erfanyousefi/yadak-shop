const mongoose = require("mongoose")
const {Schema, model, Types} = mongoose;
const UserSchema = new Schema({
    name : {type : String, default : ""},
    IdentityCard : {type : String, default : ""},
    username : {type : String, required : true},
    password : {type : String},
    token : {type : String, default : undefined},
    birthday : {type : String, default : undefined},
    otp : {type : Object, default : {code: 00000, expiresIn : (new Date().getTime() - 10000)}},
    addresses : {type : [Object], default : []},
    profile_img : {type : String, default : "default.png"},
    role : {type : String, default : "user"},
    basket : {type : [{product : String, count : Number}], default : []},
}, {
    timestamps : true,
    versionKey : false
});
const UserModel = model("user", UserSchema);
module.exports = UserModel;