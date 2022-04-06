const Controller = require("../../controller");

module.exports = new class AuthController extends Controller{
    async loginForm(req, res, next){
        try{
            return res.status(200).render("./pages/admin/auth/login")
        }catch(error){

        }
    }
    async register(req, res, next){
        try{
            const {username, password} = req.body;
        }catch(error){
            next(error)
        }
    }
    async login(req, res, next){
        try{
            if(a === "22"){
                
            }
            const {username, password} = req.body;
            
        }catch(error){
            next(error)
        }
    }

}