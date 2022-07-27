const jsonwebtoken = require("jsonwebtoken")
const UserModel = require("../../models/user")

const loginWithToken = async (req,res, next) => {
    try {
        if(req?.headers?.authorization){
            const token = req?.headers?.authorization.split(" ").pop();
            const {username} = jsonwebtoken.decode(token)
            const user = await UserModel.findOne({username})
            if(!user) throw {status : 401, message : "وارد حساب کاربری خود شوید"}
            req.user = user; 
            return next()
        }
        return res.status(401).json({
            status : 401,
            success : true,
            message : " لطفا وارد حساب  کاربری خود شوید"
        })
        
    } catch (error) {
        next(error)
    }
}
module.exports = {
    loginWithToken
}