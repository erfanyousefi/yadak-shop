const UserModel = require("../../../../models/user")
const Controller = require("../../controller")
const bcrypt = require("bcrypt");
const { sendSms } = require("../../../../modules/send_sms");
module.exports = new class AuthController extends Controller {
    async register(req, res, next){
        try {
            const {username, password, name} = req.body;
            const user = await UserModel.findOne({username});
            const salt = bcrypt.genSaltSync(13)
            const password_hash = bcrypt.hashSync(password, salt);
            await UserModel.create({
                username,
                password : password_hash,
                name,
                role : "user"
            })
            return res.status(201).json({
                status : 201,
                success : true,
                message : "ثبت نام شما با موفقیت انجام شد در بخش ورود وارد حساب کاربری خود شوید"
            })
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next){
        try {
            const {username, password} = req.body;
            const user = await UserModel.findOne({username});
            if(!user) throw {status : 400, message : "نام کاربری یا رمز عبور اشتباه میباشد"} 
            const passwordCompareResult = bcrypt.compareSync(password, user.password);
            if(!passwordCompareResult) throw {status : 400, message : "نام کاربری یا  رمز عبور اشتباه می باشد"}
            const token = await this.jwtGenerator({username, name : user.name, role : user.role});
            await UserModel.updateOne({username}, {$set : {token}});
            req.user = user;
            delete req.user.password;
            return res.status(200).json({
                status : 200,
                success : true,
                message : "ورود شما با موفقیت انجام شد",
                token
            })
        } catch (error) {
            next(error)
        }
    }
    async getOtp(req, res, next){
        try {
            const {username} = req.body;
            const user = await UserModel.findOne({username});
            const code = this.codeRandomGenerator();
            const expiresIn = (new Date().getTime() + 120000)
            const otp = {
                code,
                expiresIn
            }
            if(!user){
                await UserModel.create({
                    username,
                    role : "USER",
                    otp
                })
            }else{
                await UserModel.updateOne({username}, {$set : {otp}})
            }
            await sendSms(username, code)
            return res.status(201).json({
                status : 201,
                success : true,
                message : "کد اعتبار سنجی با موفقیت برای شما ارسال شد",
                
            })
        } catch (error) {
            next(error)
        }
    }
    async checkOtp(req, res, next){
        try {
            const {username, code} = req.body;
            const user = await UserModel.findOne({username});
            if(!user) throw {status : 401, message : "کاربری با این مشخصات یافت نشد"} 
            const userCode = +user.otp.code
            const userCodeExpires = +user.otp.expiresIn
            if(code != userCode) throw {status : 401, message : "کد ارسال شده صحیح نمیباشد"}
            if(userCodeExpires < (new Date().getTime())) throw {status : 401, message : "کد ارسال شده منقضی شده است"}
            const token = await this.jwtGenerator({username});
            user.token = token
            await user.save()
            req.user = user;
            let user_info = !!(user.name && user.IdentityCard)
            return res.status(200).json({
                status : 200,
                success : true,
                message : "ورود شما با موفقیت انجام شد",
                token,
                user_info
            })
        } catch (error) {
            next(error)
        }
    }

}