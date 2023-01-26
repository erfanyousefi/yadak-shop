const Controller = require("../../controller")
const mongoose = require("mongoose")
const UserModel = require("../../../../models/user");

module.exports = new class UserController extends Controller{
    async usersList(req, res, next){
        try{
            const filters = {};
            const users = await UserModel.find(filters).sort({_id: -1})
            return res.status(200).json({
                statusCode: 200,
                data: {
                    users,
                }
            })
        }catch(error){
            next(error)
        }
    }
    async findOneUser(req, res, next){
        try {
            const id = mongoose.isValidObjectId(req.params.id)? req.params.id : null;
            if(!id) throw {status : 400, message : "شناسه ی ارسال شده صحیح نمیباشد"} 
            const user = await UserModel.findOne({_id: id})
            if(!user) throw {status: 404, message: "کاربری یافت نشد"}
            return res.status(200).json({
                status : 200,
                user
            })
        } catch (error) {
            next(error)
        }
    }
    async editUser(req, res, next){
        try {
            const id = mongoose.isValidObjectId(req.params.id)? req.params.id : null;
            if(!id) throw {status : 400, message : "شناسه ی ارسال شده صحیح نمیباشد"} 
            Object.keys(req.body).forEach(key => !req.body[key]? delete req.body[key] : req.body[key]);
            const {name, IdentityCard} = req.body
            const user = await UserModel.findOne({_id: id})
            if(!user) throw {status: 404, message: "کاربری یافت نشد"}
            await UserModel.updateOne({_id: id}, {
                $set: {name, IdentityCard}
            })
            return res.status(200).json({
                status : 200,
                message: "به روزرسانی باموفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
}