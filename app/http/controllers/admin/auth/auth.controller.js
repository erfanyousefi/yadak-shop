const Controller = require("../../controller");

module.exports = new class AuthController extends Controller{
    async register(req, res, next){
        try{
            const {username, password} = req.body;
        }catch(error){
            next(error)
        }
    }
    async login(req, res, next){
        try{
            const {username, password} = req.body;
            
        }catch(error){
            next(error)
        }
    }

}