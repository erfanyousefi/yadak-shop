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
module.exports.login = () => {
    return [
        body("password").isLength({min : 8, max : 16}).withMessage("رمز عبور بابد حداقل 8 و حداکثر 16 نویسه باشد"),
        body("username").isMobilePhone("fa-IR").withMessage("شماره تلفن صحیح نمیباشد").custom(async (value, {req}) => {
            if(value){
                const user = await UserModel.findOne({username : value});
                if(!user){
                    throw "نام کاربری یا رمز عبور صحیح نمیباشد"
                }
                return true;
            }else{
                throw "نام کاربری نمیتواند خالی باشد"
            }
        })
    ]
}
module.exports.getOtp = () => {
    return [
        body("username").isMobilePhone("fa-IR").withMessage("شماره تلفن صحیح نمیباشد")
    ]
}
module.exports.checkOtp = () => {
    return [
        body("username").isMobilePhone("fa-IR").withMessage("شماره تلفن صحیح نمیباشد"),
        body("code").isLength({min : 4, max : 5}).withMessage("فرمت کد ارسال شده صحیح نمیباشد")
    ]
}
module.exports.profileFill = () => {
    return [
        body("name").isString().notEmpty().trim().isLength({min : 3, max : 20}).withMessage("نام و نام خانوادگی را بطور صحیح وارد کنید"),
        body("IdentityCard").isIdentityCard("IR").withMessage("کدملی صحیح نمیباشد").custom(async IdentityCard => {
            const user = await UserModel.findOne({IdentityCard});
            if(user) throw "کدملی وارد شده توسط شخص دیگر استفاده شده است"
            return true;

        })
    ]
}