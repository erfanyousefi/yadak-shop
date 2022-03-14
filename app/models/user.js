import mongoose from "mongoose";
const {Schema, model, Types} = mongoose;
const UserSchema = new Schema({
    name : {type : String, default : ""},
    username : {type : String, required : true},
    password : {type : String, required : true},
    token : {type : String, default : undefined},
    birthday : {type : String, default : undefined},
    otp : {type : Object, default : undefined},
    addresses : {type : [Object], default : []},
    profile_img : {type : String, default : "default.png"},
    role : {type : String, default : "user"},
    basket : {type : [{product : String, count : Number, company : String}], default : []},
}, {
    timestamps : true,
    versionKey : false
});
const UserModel = model("user", UserSchema);
export default UserModel;