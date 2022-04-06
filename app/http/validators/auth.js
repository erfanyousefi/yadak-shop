const { body } = require("express-validator")
const UserModel = require("../../models/user")

module.exports.register = () => {
    return [
        body("name").notEmpty().withMessage("نام و نام خانوادگی نمیتواند خالی باشد"),
        body("password").isLength({min : 8, max : 16}).withMessage("رمز عبور بابد حداقل 8 و حداکثر 16 نویسه باشد"),
        body("username").isMobilePhone("fa-IR").withMessage("شماره تلفن صحیح نمیباشد").custom(async (value, {req}) => {
            if(value){
                const user = await UserModel.findOne({username : value});
                if(user){
                    throw "نام کاربری تکراری میباشد"
                }
                return true;
            }else{
                throw "نام کاربری نمیتواند خالی باشد"
            }
        })
    ]
}