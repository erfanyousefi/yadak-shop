import UserModel from "../../../models/user.js";
import productModel from "../../../models/product.js";
import Controller from "./../controller.js";
export default new class HomeController extends Controller{
    async addToCard(req, res, next){
        const user = req.user;
        const {product, company} = req.body;
        const productRecord = await  productModel.findOne({_id : product})
        if(!productRecord) throw {status : 400, message : "محصولی یافت نشد"}
        const userProduct = await UserModel.findOne({username : user.username, "basket.product" : product, "basket.company" : company});
        let basket = {}
        if(userProduct){
            for (const basket of userProduct.basket) {
                if(basket.product == product && basket.company == company){
                    basket.count += 1;
                }
            }
            await UserModel.updateOne({_id : user._id}, {$set : {basket : userProduct.basket}})
        }else {
            basket = {product, count : 1, company}
            await UserModel.updateOne({_id : user._id}, {$push : {basket}})
        }
        return res.json({status : 201, success : true, message : "محصول با موفقیت به سبد خرید افزوده شد"})
    }
    async removeFromCard(req, res, next){
        try {
            const user = req.user;
        const {product, company} = req.body;
        const productRecord = await  productModel.findOne({_id : product})
        if(!productRecord) throw {status : 400, message : "محصولی یافت نشد"}
        const userProduct = await UserModel.findOne({username : user.username, "basket.product" : product, "basket.company" : company });
        let basket = {}
        if(userProduct){
            for (const basket of userProduct.basket) {
                if(basket.product == product && basket.company == company){
                    if(+basket.count > 1){
                        basket.count -= 1;
                        await UserModel.updateOne({_id : user._id}, {$set : {basket : userProduct.basket}})
                    }else{
                        await UserModel.updateOne({_id : user._id}, {$pull : {basket : {product}}})
                    }
                }
            }
        }else{
            throw {status : 400, message : " محصولی یافت نشد"}
        }
        return res.json({status : 201, success : true, message : "محصول با موفقیت از سبد خرید حذف شد"})
        } catch (error) {
            next(error)
        }
    }
}